import { MDXEditorMethods } from '@mdxeditor/editor'
import { notesAtom, saveNoteAtom, selectedNoteAtom, selectedNoteIndexAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'

export const useMarkdownEditor = ({ title }: { title?: string }) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)
  const [prevContent, setPrevContent] = useState<string | null>(null)

  // When title is provided, find the note with the given title (used in popup note editor)
  const notes = useAtomValue(notesAtom)
  const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)
  useEffect(() => {
    if (title && notes) {
      const noteIndex = notes.findIndex((note) => note.title === title)
      if (noteIndex !== -1) {
        setSelectedNoteIndex(noteIndex)
      }
    }
  }, [title, notes, setSelectedNoteIndex])

  const handleSave = async (content: NoteContent) => {
    setPrevContent(content)
    await saveNote(content)
  }

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote || content === prevContent) return

      console.info('Auto saving: ', selectedNote.title)

      await handleSave(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null && content !== prevContent) {
      await handleSave(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
