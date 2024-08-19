import { ActionButton, ActionButtonProps } from '@/components'
import { RxOpenInNewWindow } from 'react-icons/rx'

export const NewWindowButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <RxOpenInNewWindow className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
