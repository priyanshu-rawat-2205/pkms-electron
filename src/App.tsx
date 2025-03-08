// import { useState } from "react";
// import Sidebar from "./components/custom/Sidebar";
// import MarkdownEditor from "./components/custom/MarkdownEditor";

// const App: React.FC = () => {

//   const [markdown, setMarkdown] = useState("");
//   const [currentFile, setCurrentFile] = useState<string | null>(null);

//   const handleFileSelect = async (filename: string) => {
//     const content = await window.electronAPI.readFile(filename);
//     setMarkdown(content);
//     setCurrentFile(filename);
//   };

//   const handleSave = async () => {
//     if (currentFile) {
//       await window.electronAPI.saveFile(currentFile, markdown);
//       alert("File saved!");
//     }
//   };


//   return (
//     <div className="flex h-screen w-screen">
//       <Sidebar onFileSelect={handleFileSelect} />
//       <div className="flex-1 overflow-auto bg-gray-900">
//         <button onClick={handleSave} className="bg-blue-500 p-2 rounded mb-4">
//           Save
//         </button>
//         <MarkdownEditor />
//       </div>
//     </div>
//   );
// };

// export default App;









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

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <Sidebar onFileSelect={handleFileSelect} />
      <div className="flex-1 flex flex-col p-4">
        <Toaster />
        {currentFile && (
          <Card className="mb-4 bg-gray-800 border-none">
            <CardContent className="flex justify-between items-center p-4">
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
          <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        </div>
      </div>
    </div>
  );
};

export default App;

