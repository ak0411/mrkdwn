import { ComponentProps, useState } from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { RiUnpinLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

const RoundedButton = ({ className, children, ...props }: ComponentProps<'button'>) => (
  <button className={twMerge('w-4 h-4 rounded-full transition-colors', className)} {...props}>
    {children}
  </button>
)

export const TrafficLights = ({ className, ...props }: ComponentProps<'div'>) => {
  const [isPinned, setIsPinned] = useState(false)

  const handleToggle = () => {
    const newPinnedState = !isPinned
    setIsPinned(newPinnedState)
    window.context.pin(newPinnedState)
  }

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <div className={twMerge('flex items-center space-x-2', className)} {...props}>
      <RoundedButton onClick={handleClose} className="bg-red-500 hover:bg-red-600" />
      <RoundedButton onClick={handleMinimize} className="bg-yellow-500 hover:bg-yellow-600" />
      <RoundedButton onClick={handleMaximize} className="bg-green-500 hover:bg-green-600" />
      <RoundedButton onClick={handleToggle} className="bg-gray-500 hover:bg-gray-600">
        {isPinned ? <RiUnpinLine /> : <MdOutlinePushPin />}
      </RoundedButton>
    </div>
  )
}
