import { createNote, deleteNote, getNotes, readNote, renameNote, writeNote } from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, WriteNote } from '@shared/types'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'Mrkdwn',
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundMaterial: 'acrylic',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'allow' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.on('window-minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) win.minimize()
})

ipcMain.on('window-maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  }
})

ipcMain.on('window-close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) win.close()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('get-notes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('read-note', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('write-note', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('create-note', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('delete-note', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
  ipcMain.handle('rename-note', (_, ...args: Parameters<RenameNote>) => renameNote(...args))

  ipcMain.handle('get-platform', () => process.platform)

  ipcMain.handle('popup-note', async (_, title: string) => {
    const existingWindow = BrowserWindow.getAllWindows().find((win) => win.getTitle() === title)

    if (existingWindow) {
      existingWindow.focus()
      return
    }

    const popupNote = new BrowserWindow({
      width: 800,
      height: 600,
      ...(process.platform === 'linux' ? { icon } : {}),
      center: true,
      title: title,
      frame: false,
      titleBarStyle: 'hiddenInset',
      backgroundMaterial: 'acrylic',
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: true,
        contextIsolation: true
      }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      popupNote.loadURL(
        `${process.env['ELECTRON_RENDERER_URL']}#/note/${encodeURIComponent(title)}`
      )
    } else {
      popupNote.loadFile(join(__dirname, '../renderer/index.html'), {
        hash: `/note/${encodeURIComponent(title)}`
      })
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
