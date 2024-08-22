import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TrafficLightsProps = ComponentProps<'div'> & {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export const TrafficLights = ({
  onClose,
  onMinimize,
  onMaximize,
  className,
  ...props
}: TrafficLightsProps) => {
  return (
    <div className={twMerge('flex items-center space-x-2', className)} {...props}>
      <button
        onClick={onClose}
        className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
      />
      <button
        onClick={onMinimize}
        className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
      />
      <button
        onClick={onMaximize}
        className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
      />
    </div>
  )
}
