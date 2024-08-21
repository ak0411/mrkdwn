import { useFloatingNoteTitle } from '@renderer/hooks/useFloatingNoteTitle'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NewWindowButton, RenameButton } from './Button'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const {
    selectedNote,
    isEditing,
    editTitle,
    setEditTitle,
    handleRename,
    handleSave,
    handleCancel
  } = useFloatingNoteTitle()

  if (!selectedNote) return null

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
