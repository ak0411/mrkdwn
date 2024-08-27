import {
  ActionButtonRows,
  Content,
  DraggableTopBar,
  FloatingNoteBar,
  MarkdownEditor,
  NotePreviewList,
  PopupNoteEditor,
  RootLayout,
  Sidebar,
  TrafficLights
} from '@/components'
import { useRef } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  const handleClose = () => window.context.close()
  const handleMinimize = () => window.context.minimize()
  const handleMaximize = () => window.context.maximize()

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DraggableTopBar>
                <DraggableTopBar className="z-50">
                  <TrafficLights
                    onClose={handleClose}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    className="m-2"
                  />
                </DraggableTopBar>
              </DraggableTopBar>
              <RootLayout>
                <Sidebar className="p-2">
                  <ActionButtonRows className="flex justify-between mt-1" />
                  <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
                </Sidebar>
                <Content ref={contentContainerRef} className="bg-zinc-900/50">
                  <FloatingNoteBar className="pt-2" />
                  <MarkdownEditor />
                </Content>
              </RootLayout>
            </>
          }
        />
        <Route path="/note/:title" element={<PopupNoteEditor />} />
      </Routes>
    </Router>
  )
}

export default App
