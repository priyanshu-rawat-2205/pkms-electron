import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import Sidebar from "./components/custom/Sidebar";
import MarkdownEditor from "./components/custom/MarkdownEditor";
import GraphView from "./components/custom/GraphView";
import Navbar from "./components/custom/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


const App: React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'editor' | 'graph'>('editor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const debouncedSave = useCallback(
    debounce(async (content: string, file: string) => {
      await window.electronAPI.saveFile(file, content);
      toast("Auto-saved", {
        description: `${file} has been saved.`,
        duration: 2000,
      });
    }, 1000),
    []
  );

  const handleMarkdownChange = (content: string) => {
    setMarkdown(content);
    if (currentFile) {
      debouncedSave(content, currentFile);
    }
  };

  const handleFileSelect = async (filename: string) => {
    // Clear editor if filename is empty
    if (!filename) {
      setMarkdown("");
      setCurrentFile(null);
      return;
    }

    // Check if file exists before loading
    const files = await window.electronAPI.listFiles();
    if (!files.includes(filename)) {
      toast("File not found", {
        description: `The file "${filename}" no longer exists.`,
        duration: 2000,
      });
      return;
    }

    const content = await window.electronAPI.readFile(filename);
    setMarkdown(content);
    setCurrentFile(filename);
    // Save last opened file
    await window.electronAPI.setLastOpenedFile(filename);
  };

  const handleSave = async () => {
    if (currentFile) {
      await window.electronAPI.saveFile(currentFile, markdown);
      toast("file saved",{
        description: `${currentFile} has been saved.`,
      });
    }
  };

  const handleFileReference = async (filename: string) => {
    // Check if file exists before following reference
    const files = await window.electronAPI.listFiles();
    if (!files.includes(filename)) {
      toast("Broken Link", {
        description: `The referenced file "${filename}" no longer exists.`,
        duration: 3000,
      });
      return;
    }
    handleFileSelect(filename);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-hidden text-white">
      <Sidebar 
        onFileSelect={(filename) => {
          handleFileSelect(filename);
          setViewMode('editor');
          setIsSidebarOpen(false);
        }} 
        selectedFile={currentFile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Navbar 
          currentFile={currentFile}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onSave={handleSave}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <div className="flex-1 overflow-auto p-4 pt-16">
          <Toaster />
          {viewMode === 'editor' ? (
            <div scrollbar-hide key={currentFile}>
              <MarkdownEditor 
                markdown={markdown} 
                setMarkdown={handleMarkdownChange}
                onFileReference={handleFileReference}
              />
            </div>
          ) : (
            <GraphView 
              onNodeClick={handleFileSelect} 
              setViewMode={setViewMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

