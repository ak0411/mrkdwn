import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
export type RenameNote = (title: NoteInfo['title'], newTitle: string) => Promise<boolean>
export type GetPlatform = () => Promise<NodeJS.Platform>
export type PopupNote = (note: NoteInfo & { content: NoteContent }) => Promise<void>
