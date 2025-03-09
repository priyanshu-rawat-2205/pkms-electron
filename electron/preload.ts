
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
