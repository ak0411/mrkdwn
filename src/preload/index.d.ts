import {
  Close,
  CreateNote,
  DeleteNote,
  GetNotes,
  GetPlatform,
  Maximize,
  Minimize,
  ReadNote,
  RenameNote,
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
      renameNote: RenameNote
      minimize: Minimize
      maximize: Maximize
      close: Close
      getPlatform: GetPlatform
    }
  }
}
