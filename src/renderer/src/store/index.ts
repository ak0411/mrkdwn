import { NoteContent, NoteInfo } from '@shared/models'
import { atom, WritableAtom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { isEmpty } from 'lodash'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const providedTitleAtom = atom<string | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)
  const providedTitle = get(providedTitleAtom)

  if (providedTitle) {
    const noteContent = await window.context.readNote(providedTitle)
    return {
      title: providedTitle,
      content: noteContent,
      lastEditTime: Date.now()
    }
  }

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]
  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) => prev ?? null
) as WritableAtom<
  { title: string; content: string; lastEditTime: number } | null,
  [{ title: string; content: string; lastEditTime: number } | null],
  void
>

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  const providedTitle = get(providedTitleAtom)

  if (!selectedNote) return

  const title = providedTitle || selectedNote.title

  // save on disk
  await window.context.writeNote(title, newContent)

  if (notes) {
    //update the saved note's last edit time
    set(
      notesAtom,
      notes.map((note) => {
        if (note.title === title) {
          return {
            ...note,
            lastEditTime: Date.now()
          }
        }
        return note
      })
    )
  }

  if (providedTitle) {
    set(selectedNoteAtom, {
      title: providedTitle,
      content: newContent,
      lastEditTime: Date.now()
    })
  }
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.context.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)

  if (!isDeleted) return

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  set(selectedNoteIndexAtom, null)
})

export const renameNoteAtom = atom(null, async (get, set, newTitle: string) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes || isEmpty(newTitle) || newTitle === selectedNote.title) return

  const isRenamed = await window.context.renameNote(selectedNote.title, newTitle)

  if (!isRenamed) return

  const updatedNote = {
    ...selectedNote,
    title: newTitle,
    lastEditTime: Date.now()
  }

  // Filter out the old note and add the updated one to the top of the list
  set(notesAtom, [updatedNote, ...notes.filter((note) => note.title !== selectedNote.title)])

  // Optionally, update the selected note index if needed
  set(selectedNoteIndexAtom, 0)
})

const loadPlatform = async () => {
  const platform = await window.context.getPlatform()
  return platform
}

export const platformAtom = atom<Promise<NodeJS.Platform>>(loadPlatform())
