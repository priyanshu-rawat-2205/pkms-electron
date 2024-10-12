import { Background, Controls, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
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
import { useGraphNode } from './hooks/useGraphNode'

const App = () => {
  const [expanded, setExpanded] = useState(true)
  const [graphView, setGraphView] = useState(false)
  const graphdata = useGraphNode()

  const contentContainerRef = useRef<HTMLDivElement>(null)

  const renderNotes = () => {
    return (
      <>
        <FloatingNoteTitle className="pt-2" />
        <MarkdownEditor />
      </>
    )
  }

  const renderGraphView = () => {
    return (
      <div className="w-screen h-screen text-black">
        <ReactFlow fitView nodes={graphdata}>
          <Background gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    )
  }

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
    setGraphView(false)
  }
  return (
    <>
      {/* <TopBar className="bg-zinc-700"></TopBar> */}

      <RootLayout>
        <ActionButtonsRow
          expanded={expanded}
          setExpanded={setExpanded}
          graphView={graphView}
          setGraphView={setGraphView}
          className="flex-col w-[55px] p-3 bg-gray-700 "
        />
        <Sidebar expanded={expanded} setExpanded={setExpanded} className="p-2 bg-gray-700">
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l border-l-white/20 bg-slate-800">
          {!graphView ? renderNotes() : renderGraphView()}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
