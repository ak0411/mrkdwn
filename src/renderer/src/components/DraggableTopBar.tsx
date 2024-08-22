import { usePlatform } from '@renderer/hooks/usePlatform'
import { TrafficLights } from './TrafficLights'

export const DraggableTopBar = () => {
  const { isMacOS } = usePlatform()
  if (isMacOS) return <header className="absolute inset-0 h-8 bg-transparent" />

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <header className="absolute inset-0 h-8 bg-transparent">
      <TrafficLights
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        className="m-2"
      />
    </header>
  )
}
