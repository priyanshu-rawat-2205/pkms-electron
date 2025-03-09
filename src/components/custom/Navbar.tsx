import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, GitGraph, Menu, Save } from "lucide-react";

interface NavbarProps {
  currentFile: string | null;
  viewMode: 'editor' | 'graph';
  setViewMode: (mode: 'editor' | 'graph') => void;
  onSave: () => void;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentFile,
  viewMode,
  setViewMode,
  onSave,
  onMenuClick,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onMenuClick} size="icon">
          <Menu className="w-5 h-5" />
        </Button>
        {currentFile && (
          <span className="text-gray-300 text-sm">
            {currentFile}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {currentFile && viewMode === 'editor' && (
          <Button
            onClick={onSave}
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:text-blue-300"
          >
            <Save className="w-5 h-5" />
          </Button>
        )}
        <div className="flex gap-1 bg-gray-900 rounded-md p-1">
          <Button
            variant={viewMode === 'editor' ? 'default' : 'ghost'}
            onClick={() => setViewMode('editor')}
            size="sm"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Editor
          </Button>
          <Button
            variant={viewMode === 'graph' ? 'default' : 'ghost'}
            onClick={() => setViewMode('graph')}
            size="sm"
            className="flex items-center gap-2"
          >
            <GitGraph className="w-4 h-4" />
            Graph
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 