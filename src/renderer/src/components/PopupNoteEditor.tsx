import { Content, DraggableTopBar, MarkdownEditor, RootLayout, TrafficLights } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PopupNoteEditor = () => {
  const { title } = useParams<{ title: string }>()
  const [isScrollTop, setIsScrollTop] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrollTop(contentRef.current.scrollTop < 50)
      }
    }

    const contentElement = contentRef.current
    contentElement?.addEventListener('scroll', handleScroll)

    return () => {
      contentElement?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <>
      <DraggableTopBar className="z-50">
        <TrafficLights
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          className={`
            m-2 transition-opacity duration-300
            ${isScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        />
      </DraggableTopBar>
      <RootLayout>
        <Content ref={contentRef}>
          <h1
            className={`
              sticky top-0 bg-transparent pt-1
              transition-opacity duration-300
              text-center text-gray-400
              ${isScrollTop ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {title}
          </h1>
          <MarkdownEditor title={title} />
        </Content>
      </RootLayout>
    </>
  )
}
