import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from './Button'

export const ActionButtonRows = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
