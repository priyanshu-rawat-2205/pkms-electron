import React from 'react';
import { Command } from "@/components/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FileReferenceAutoCompleteProps {
  files: string[];
  isOpen: boolean;
  onSelect: (filename: string) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const FileReferenceAutoComplete: React.FC<FileReferenceAutoCompleteProps> = ({
  files,
  isOpen,
  onSelect,
  triggerRef
}) => {
  console.log('FileReferenceAutoComplete:', { files, isOpen });
  
  if (!files.length || !isOpen) {
    console.log('Not rendering autocomplete');
    return null;
  }

  return (
    <div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div className="w-[300px] rounded-md border-2 border-white bg-gray-800 text-white shadow-lg">
        <div className="p-2 border-b border-gray-700">
          File Suggestions ({files.length})
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {files.map((file) => (
            <button
              key={file}
              className="w-full px-4 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
              onClick={() => onSelect(file)}
            >
              {file}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileReferenceAutoComplete; 