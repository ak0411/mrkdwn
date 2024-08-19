import { ActionButton, ActionButtonProps } from '@/components'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

export const RenameButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <MdOutlineDriveFileRenameOutline className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
