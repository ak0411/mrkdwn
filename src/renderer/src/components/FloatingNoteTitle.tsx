import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NewWindowButton, RenameButton } from './Button'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className={twMerge('flex justify-center relative', className)} {...props}>
      <span className="text-gray-400">{selectedNote.title}</span>
      <div className="absolute right-2 flex gap-2">
        <RenameButton />
        <NewWindowButton />
      </div>
    </div>
  )
}
