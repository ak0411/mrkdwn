import { usePlatform } from '@renderer/hooks/usePlatform'

export const DraggableTopBar = () => {
  const { isMacOS } = usePlatform()
  if (isMacOS) return <header className="absolute inset-0 h-8 bg-transparent" />

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <header className="absolute inset-0 h-8 bg-transparent">
      <div className="flex items-center m-2 space-x-2">
        <button
          onClick={handleClose}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        />
        <button
          onClick={handleMinimize}
          className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
        />
        <button
          onClick={handleMaximize}
          className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
        />
      </div>
    </header>
  )
}
