import { Content, DraggableTopBar, MarkdownEditor, RootLayout } from '@/components'
import { useParams } from 'react-router-dom'

export const PopupNoteEditor = () => {
  const { title } = useParams<{ title: string }>()

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Content>
          <MarkdownEditor title={title} />
        </Content>
      </RootLayout>
    </>
  )
}
