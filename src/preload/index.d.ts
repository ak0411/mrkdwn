import {
  Close,
  CreateNote,
  DeleteNote,
  GetNotes,
  GetPlatform,
  Maximize,
  Minimize,
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
      minimize: Minimize
      maximize: Maximize
      close: Close
      getPlatform: GetPlatform
    }
  }
}
