import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TrafficLightsProps = ComponentProps<'div'> & {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onPin?: () => void
}

const RoundedButton = ({ className, ...props }: ComponentProps<'button'>) => (
  <button className={twMerge('w-4 h-4 rounded-full transition-colors', className)} {...props} />
)

export const TrafficLights = ({
  onClose,
  onMinimize,
  onMaximize,
  onPin,
  className,
  ...props
}: TrafficLightsProps) => {
  return (
    <div className={twMerge('flex items-center space-x-2', className)} {...props}>
      <RoundedButton onClick={onClose} className="bg-red-500 hover:bg-red-600" />
      <RoundedButton onClick={onMinimize} className="bg-yellow-500 hover:bg-yellow-600" />
      <RoundedButton onClick={onMaximize} className="bg-green-500 hover:bg-green-600" />
    </div>
  )
}
