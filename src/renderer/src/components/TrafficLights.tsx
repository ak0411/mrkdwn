import { usePlatform } from '@renderer/hooks/usePlatform'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const TrafficLights = ({ className, ...props }: ComponentProps<'div'>) => {
  const { isMacOS } = usePlatform()
  if (isMacOS) return null

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <div className={twMerge('flex items-center space-x-2', className)} {...props}>
      <button
        onClick={handleClose}
        className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
      />
      <button
        onClick={handleMinimize}
        className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
      />
      <button
        onClick={handleMaximize}
        className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
      />
    </div>
  )
}
