import React from "react";
import Sidebar from "./components/custom/Sidebar";
import MarkdownEditor from "./components/custom/MarkdownEditor";

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-zinc-600">
        <MarkdownEditor />
      </div>
    </div>
  );
};

export default App;
