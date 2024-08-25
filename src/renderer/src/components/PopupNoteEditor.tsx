import { Content, DraggableTopBar, MarkdownEditor, RootLayout } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PopupNoteEditor = () => {
  const { title } = useParams<{ title: string }>()
  const [showTitle, setShowTitle] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowTitle(contentRef.current.scrollTop < 50)
      }
    }

    const contentElement = contentRef.current
    contentElement?.addEventListener('scroll', handleScroll)

    return () => {
      contentElement?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <DraggableTopBar className="z-50" />
      <RootLayout>
        <Content ref={contentRef}>
          <h1
            className={`
              sticky top-0 bg-transparent pt-1
              transition-opacity duration-300
              text-center text-gray-400
              ${showTitle ? 'opacity-100' : 'opacity-0'}
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
