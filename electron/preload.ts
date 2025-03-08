// import { ipcRenderer, contextBridge } from 'electron'

// // --------- Expose some API to the Renderer process ---------
// contextBridge.exposeInMainWorld('ipcRenderer', {
//   on(...args: Parameters<typeof ipcRenderer.on>) {
//     const [channel, listener] = args
//     return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
//   },
//   off(...args: Parameters<typeof ipcRenderer.off>) {
//     const [channel, ...omit] = args
//     return ipcRenderer.off(channel, ...omit)
//   },
//   send(...args: Parameters<typeof ipcRenderer.send>) {
//     const [channel, ...omit] = args
//     return ipcRenderer.send(channel, ...omit)
//   },
//   invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
//     const [channel, ...omit] = args
//     return ipcRenderer.invoke(channel, ...omit)
//   },

//   // You can expose other APTs you need here.
//   // ...
// })




import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  listFiles: () => ipcRenderer.invoke("list-files"),
  readFile: (filename: string) => ipcRenderer.invoke("read-file", filename),
  createFile: (filename: string) => ipcRenderer.invoke("create-file", filename),
  saveFile: (filename: string, content: string) =>
    ipcRenderer.invoke("save-file", filename, content),
  deleteFile: (filename: string) => ipcRenderer.invoke("delete-file", filename),
});
