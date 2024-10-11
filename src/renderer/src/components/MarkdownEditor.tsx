import { MDXEditor } from '@mdxeditor/editor'

export const MarkdownEditor = () => {
  return (
    <div>
      <MDXEditor
        markdown={'# Hello from pkms'}
        contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500"
      />
    </div>
  )
}
