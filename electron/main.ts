import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';

// @ts-ignore
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

// Initialize electron store with specific configuration
const store = new Store({
  name: 'markdown-app-data', // Specific name for our store
  clearInvalidConfig: true,  // Clear invalid data
  defaults: {               // Default values
    lastOpenedDirectory: null,
    lastOpenedFile: null
  }
});

console.log('Store path:', store.path);

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

// -------- File System Operations -------- //
let selectedDirectory: string | null = null; // Store the selected directory path

// Add these new IPC handlers
ipcMain.handle("get-last-opened-directory", () => {
  const dir = store.get('lastOpenedDirectory');
  console.log('Retrieved last directory:', dir);
  if (dir && fs.existsSync(dir)) {
    selectedDirectory = dir; // Set the selectedDirectory when retrieving
    return dir;
  }
  return null; // Return null if directory doesn't exist
});

ipcMain.handle("get-last-opened-file", () => {
  return store.get('lastOpenedFile');
});

ipcMain.handle("set-last-opened-directory", (_, directory: string) => {
  console.log('Saving directory:', directory);
  store.set('lastOpenedDirectory', directory);
});

ipcMain.handle("set-last-opened-file", (_, file: string) => {
  store.set('lastOpenedFile', file);
});

// Modify the existing select-directory handler
ipcMain.handle("select-directory", async () => {
  const result = await dialog.showOpenDialog(win!, {
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    selectedDirectory = result.filePaths[0];
    console.log('Selected directory:', selectedDirectory);
    store.set('lastOpenedDirectory', selectedDirectory);
    return selectedDirectory;
  }
  return null;
});

// List markdown files in directory
ipcMain.handle("list-files", async () => {
  if (!selectedDirectory) return [];
  const files = fs.readdirSync(selectedDirectory).filter(file => file.endsWith(".md"));
  return files;
});

// Read a markdown file
ipcMain.handle("read-file", async (_, filename) => {
  if (!selectedDirectory) return "";
  const filePath = path.join(selectedDirectory, filename);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
});

// Create a new markdown file
ipcMain.handle("create-file", async (_, filename) => {
  if (!selectedDirectory) return null;
  const filePath = path.join(selectedDirectory, filename + ".md");
  fs.writeFileSync(filePath, "# New Note\nStart writing here...");
  return filename + ".md"; // Return the new file's name
});

// Save markdown file
ipcMain.handle("save-file", async (_, filename, content) => {
  if (!selectedDirectory) return null;
  const filePath = path.join(selectedDirectory, filename);
  fs.writeFileSync(filePath, content, "utf8");
  return true;
});

// Delete markdown file
ipcMain.handle("delete-file", async (_, filename) => {
  if (!selectedDirectory) return null;
  const filePath = path.join(selectedDirectory, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
});
