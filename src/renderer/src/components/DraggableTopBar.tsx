import { TrafficLights } from './TrafficLights'

export const DraggableTopBar = () => {
  return (
    <header className="absolute inset-0 h-8 bg-transparent">
      <TrafficLights className="m-2" />
    </header>
  )
}
