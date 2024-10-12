import {
  CreateNote,
  DeleteNote,
  GenerateGraphJSON,
  GetNotes,
  ReadNote,
  WriteNote
} from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      generateGraphJSON: GenerateGraphJSON
    }
  }
}
