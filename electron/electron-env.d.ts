/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer;
  electronAPI: {
    selectDirectory: () => Promise<string | null>;
    listFiles: () => Promise<string[]>;
    readFile: (filename: string) => Promise<string>;
    createFile: (filename: string) => Promise<string | null>;
    saveFile: (filename: string, content: string) => Promise<boolean>;
    deleteFile: (filename: string) => Promise<boolean>;
  };
}



