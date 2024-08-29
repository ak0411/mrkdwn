import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const DraggableTopBar = ({ children, className }: ComponentProps<'header'>) => {
  return (
    <header className={twMerge('absolute inset-0 h-8 bg-transparent', className)}>
      {children}
    </header>
  )
}
