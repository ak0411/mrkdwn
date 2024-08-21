import { renameNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const useFloatingNoteTitle = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const renameNote = useSetAtom(renameNoteAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(selectedNote?.title || '')

  useEffect(() => {
    if (selectedNote) {
      setEditTitle(selectedNote.title)
    }
  }, [selectedNote])

  const handleRename = () => {
    setIsEditing(!isEditing)
    console.info(isEditing)
  }

  const handleSave = () => {
    renameNote(editTitle)
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (selectedNote) {
      setEditTitle(selectedNote.title)
    }
    setIsEditing(false)
  }

  return {
    selectedNote,
    isEditing,
    editTitle,
    setEditTitle,
    handleRename,
    handleSave,
    handleCancel
  }
}
