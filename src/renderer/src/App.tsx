import {
  ActionButtonsRow,
  Content,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar,
  TopBar
} from './components'

const App = () => {
  return (
    <>
      <TopBar className="bg-zinc-700"></TopBar>
      <RootLayout>
        <Sidebar className="p-2 bg-gray-700">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l border-l-white/20 bg-slate-800">
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
