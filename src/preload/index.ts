import {
  CreateNote,
  DeleteNote,
  GetNotes,
  PopupNote,
  ReadNote,
  RenameNote,
  WriteNote
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locate: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('get-notes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('read-note', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('write-note', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('create-note', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('delete-note', ...args),
    renameNote: (...args: Parameters<RenameNote>) => ipcRenderer.invoke('rename-note', ...args),
    platform: () => ipcRenderer.invoke('get-platform'),
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    pin: (isPinned: boolean) => ipcRenderer.send('window-pin', isPinned),
    getPlatform: () => ipcRenderer.invoke('get-platform'),
    popupNote: (...args: Parameters<PopupNote>) => ipcRenderer.invoke('popup-note', ...args)
  })
} catch (error) {
  console.error(error)
}
