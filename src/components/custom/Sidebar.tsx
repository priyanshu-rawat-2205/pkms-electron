// import React, { useState } from "react";
// import {
//   Collapsible,
//   CollapsibleTrigger,
//   CollapsibleContent,
// } from "@/components/ui/collapsible";
// import { Button } from "@/components/ui/button";
// import { Menu, FileText, ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// const Sidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <Collapsible open={isOpen} onOpenChange={setIsOpen} className="h-full">
//       {/* Sidebar Container */}
//       <div
//         className={cn(
//           "h-full bg-gray-900 text-gray-700 transition-all duration-300 flex flex-col",
//           isOpen ? "w-64 p-4" : "w-16 p-2"
//         )}
//       >
//         {/* Toggle Button */}
//         <CollapsibleTrigger asChild>
//           <Button
//             variant="ghost"
//             className="p-2"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <Menu size={24} />
//           </Button>
//         </CollapsibleTrigger>

//         {/* Notes List (Only Visible When Expanded) */}
//         <CollapsibleContent className="mt-4 space-y-2">
//           {["note1.md", "note2.md", "note3.md"].map((note, idx) => (
//             <Button
//               key={idx}
//               variant="ghost"
//               className="w-full flex items-center justify-start gap-2"
//             >
//               <FileText size={18} /> {note}
//             </Button>
//           ))}
//         </CollapsibleContent>

//         {/* Collapsed View (Arrow Indicator) */}
//         {!isOpen && (
//           <div className="absolute top-1/2 left-4 -translate-y-1/2">
//             <ChevronRight size={20} className="text-gray-400" />
//           </div>
//         )}
//       </div>
//     </Collapsible>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash, Menu, FilePlus, FolderOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Sidebar: React.FC<{ onFileSelect: (filename: string) => void }> = ({
  onFileSelect,
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  useEffect(() => {
    async function fetchFiles() {
      const files = await window.electronAPI.listFiles();
      setFiles(files);
    }
    fetchFiles();
  }, []);

  const handleSelectDirectory = async () => {
    const directory = await window.electronAPI.selectDirectory();
    if (directory) {
      setFiles(await window.electronAPI.listFiles());
    }
  };

  const handleCreateFile = async () => {
    // const filename = prompt("Enter file name:");
    // if (filename) {
    //   await window.electronAPI.createFile(filename);
    //   setFiles(await window.electronAPI.listFiles());
    // }
    if (newFileName.trim()) {
      await window.electronAPI.createFile(newFileName.trim());
      setFiles(await window.electronAPI.listFiles());
      setNewFileName(""); // Reset the input
      setIsCreateDialogOpen(false); // Close the dialog
    }
  };

  const handleDeleteFile = async (filename: string) => {
    if (window.confirm(`Delete ${filename}?`)) {
      await window.electronAPI.deleteFile(filename);
      setFiles(await window.electronAPI.listFiles());
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="fixed top-4 left-4 z-50">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white p-4">
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSelectDirectory}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FolderOpen className="w-5 h-5" /> Select Directory
            </Button>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FilePlus className="w-5 h-5" /> Create Note
            </Button>
          </div>
          <ScrollArea className="mt-4 h-[70vh]">
            <ul className="space-y-2">
              {files.map((file) => (
                <li
                  key={file}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-800 transition ${
                    selectedFile === file ? "bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    setSelectedFile(file);
                    onFileSelect(file);
                    setIsOpen(false);
                  }}
                >
                  <span>{file}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(file);
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter file name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="bg-gray-800 border-gray-700"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateFile();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFile}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  );
};

export default Sidebar;
