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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DraggableTopBar />
              <RootLayout>
                <Sidebar className="p-2 z-10">
                  <TrafficLights className="mb-10" />
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
