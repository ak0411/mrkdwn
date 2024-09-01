import {
  CreateNote,
  DeleteNote,
  GetNotes,
  GetPlatform,
  PopupNote,
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
      minimize: () => void
      maximize: () => void
      close: () => void
      pin: (isPinned: boolean) => void
      getPlatform: GetPlatform
      popupNote: PopupNote
    }
  }
}
