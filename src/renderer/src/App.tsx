import { useRef, useState } from 'react'
import {
  ActionButtonsRow,
  Content,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

const App = () => {
  const [expanded, setExpanded] = useState(true)
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      {/* <TopBar className="bg-zinc-700"></TopBar> */}

      <RootLayout>
        <ActionButtonsRow
          expanded={expanded}
          setExpanded={setExpanded}
          className="flex-col w-[55px] p-3 bg-gray-700 "
        />
        <Sidebar expanded={expanded} setExpanded={setExpanded} className="p-2 bg-gray-700">
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l border-l-white/20 bg-slate-800">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
