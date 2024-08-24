import { usePlatform } from '@renderer/hooks/usePlatform'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { TrafficLights } from './TrafficLights'

export const DraggableTopBar = ({ className }: ComponentProps<'header'>) => {
  const { isMacOS } = usePlatform()
  if (isMacOS)
    return <header className={twMerge('absolute inset-0 h-8 bg-transparent', className)} />

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <header className={twMerge('absolute inset-0 h-8 bg-transparent', className)}>
      <TrafficLights
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        className="m-2"
      />
    </header>
  )
}
