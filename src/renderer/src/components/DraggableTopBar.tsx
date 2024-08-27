import { usePlatform } from '@renderer/hooks/usePlatform'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const DraggableTopBar = ({ children, className }: ComponentProps<'header'>) => {
  const { isMacOS } = usePlatform()
  if (isMacOS)
    return <header className={twMerge('absolute inset-0 h-8 bg-transparent', className)} />

  return (
    <header className={twMerge('absolute inset-0 h-8 bg-transparent', className)}>
      {children}
    </header>
  )
}
