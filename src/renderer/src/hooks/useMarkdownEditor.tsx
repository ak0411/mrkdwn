import { MDXEditorMethods } from '@mdxeditor/editor'
import { providedTitleAtom, saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useEffect, useRef } from 'react'

export const useMarkdownEditor = (title?: string) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const setProvidedTitle = useSetAtom(providedTitleAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  useEffect(() => {
    if (title) {
      setProvidedTitle(title)
    }
  }, [title, setProvidedTitle])

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving: ', selectedNote.title)

      await saveNote(content)
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

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
