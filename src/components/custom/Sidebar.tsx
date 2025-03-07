import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Menu, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="h-full">
      {/* Sidebar Container */}
      <div
        className={cn(
          "h-full bg-gray-900 text-gray-700 transition-all duration-300 flex flex-col",
          isOpen ? "w-64 p-4" : "w-16 p-2"
        )}
      >
        {/* Toggle Button */}
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </Button>
        </CollapsibleTrigger>

        {/* Notes List (Only Visible When Expanded) */}
        <CollapsibleContent className="mt-4 space-y-2">
          {["note1.md", "note2.md", "note3.md"].map((note, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="w-full flex items-center justify-start gap-2"
            >
              <FileText size={18} /> {note}
            </Button>
          ))}
        </CollapsibleContent>

        {/* Collapsed View (Arrow Indicator) */}
        {!isOpen && (
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        )}
      </div>
    </Collapsible>
  );
};

export default Sidebar;
