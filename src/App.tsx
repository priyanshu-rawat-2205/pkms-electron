import React, { useState } from "react";
import Sidebar from "./components/custom/Sidebar";
import MarkdownEditor from "./components/custom/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const handleFileSelect = async (filename: string) => {
    const content = await window.electronAPI.readFile(filename);
    setMarkdown(content);
    setCurrentFile(filename);
  };

  const handleSave = async () => {
    if (currentFile) {
      await window.electronAPI.saveFile(currentFile, markdown);
      toast("file saved",{
        description: `${currentFile} has been saved.`,
      });
    }
  };

  const handleFileReference = (filename: string) => {
    handleFileSelect(filename);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-y-auto text-white">
      <Sidebar 
        onFileSelect={handleFileSelect} 
        selectedFile={currentFile}
      />
      <div className="flex-1 flex flex-col p-4">
        <Toaster />
        {currentFile && (
          <Card className="mb-2 mt-12 bg-gray-800 border-none">
            <CardContent className="flex justify-between items-center">
              <p className="text-xl text-gray-400">{currentFile}</p>
              <Button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Save
              </Button>
            </CardContent>
          </Card>
        )}
        <div key={currentFile}>
          <MarkdownEditor 
            markdown={markdown} 
            setMarkdown={setMarkdown}
            onFileReference={handleFileReference}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

