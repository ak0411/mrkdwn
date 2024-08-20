import { renameNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { NewWindowButton, RenameButton } from './Button'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const renameNote = useSetAtom(renameNoteAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(selectedNote?.title || '')

  useEffect(() => {
    if (selectedNote) {
      setEditTitle(selectedNote.title)
    }
  }, [selectedNote])

  if (!selectedNote) return null

  const handleRename = () => {
    setIsEditing(!isEditing)
    console.info(isEditing)
  }

  const handleSave = () => {
    renameNote(editTitle)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(selectedNote.title)
    setIsEditing(false)
  }

  return (
    <div className={twMerge('flex justify-center relative', className)} {...props}>
      {isEditing ? (
        <input
          className="text-gray-400 bg-transparent focus:outline-none caret-yellow-500 text-center"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleCancel}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') handleCancel()
          }}
          autoFocus
        />
      ) : (
        <span className="text-gray-400">{selectedNote.title}</span>
      )}
      <div className="absolute right-2 flex gap-2">
        {!isEditing && <RenameButton onClick={handleRename} />}
        <NewWindowButton />
      </div>
    </div>
  )
}
