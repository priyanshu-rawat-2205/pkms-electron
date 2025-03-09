import React, { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash, FilePlus, FolderOpen, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  onFileSelect: (filename: string) => void;
  selectedFile: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onFileSelect,
  selectedFile,
  isOpen,
  setIsOpen
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  useEffect(() => {
    async function fetchFiles() {
      const files = await window.electronAPI.listFiles();
      setFiles(files);
    }
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file => 
    file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDirectory = async () => {
    const directory = await window.electronAPI.selectDirectory();
    if (directory) {
      setFiles(await window.electronAPI.listFiles());
    }
  };

  const handleCreateFile = async () => {
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
      
      // Clear editor if the deleted file was open
      if (selectedFile === filename) {
        onFileSelect(''); // This will trigger clearing the editor
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-64 bg-gray-900 text-white p-4">
        <div className="flex flex-col gap-4">
          {/* Search Input */}
          <div className="relative w-8/9">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-gray-800 border-gray-700"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSelectDirectory}
              variant="ghost"
              size="icon"
              className="flex-1 hover:bg-gray-800"
            >
              <FolderOpen className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              variant="ghost"
              size="icon"
              className="flex-1 hover:bg-gray-800"
            >
              <FilePlus className="w-5 h-5" />
            </Button>
          </div>

          {/* Files List */}
          <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
            <ul className="space-y-2">
              {filteredFiles.map((file) => (
                <li
                  key={file}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-800 transition ${
                    selectedFile === file ? "bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    onFileSelect(file);
                    setIsOpen(false);
                  }}
                >
                  <div className="w-44 min-w-0">
                    <span className="block truncate text-sm">{file.replace('.md', '')}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(file);
                    }}
                    className="text-red-400 hover:text-red-500 flex-shrink-0 ml-2"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </SheetContent>

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
    </Sheet>
  );
};

export default Sidebar;
