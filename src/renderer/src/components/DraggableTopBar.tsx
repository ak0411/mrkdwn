import { WindowControl } from './WindowControl'

export const DraggableTopBar = () => {
  return (
    <header className="absolute inset-0 h-8 bg-transparent">
      <WindowControl className="m-2" />
    </header>
  )
}
