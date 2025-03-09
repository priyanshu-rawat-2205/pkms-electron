// import {
//     MDXEditor,
//     headingsPlugin,
//     listsPlugin,
//     markdownShortcutPlugin,
//     quotePlugin,
//   } from "@mdxeditor/editor";
  
//   interface MarkdownEditorProps {
//     markdown: string;
//     setMarkdown: (content: string) => void;
//   }
  
//   const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
//     markdown,
//     setMarkdown,
//   }: MarkdownEditorProps) => {
    
//     return (
//       <MDXEditor
//         markdown={markdown}
//         onChange={setMarkdown}
//         plugins={[
//           headingsPlugin(),
//           listsPlugin(),
//           quotePlugin(),
//           markdownShortcutPlugin(),
//         ]}
//         contentEditableClassName="outline-none min-h-screen 
//         max-w-none text-lg px-8 py-5 caret-yellow-500 prose 
//         prose-invert prose-p:my-3 prose-p:leading-relaxed 
//         prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 
//         prose-li:my-0 prose-code:px-1 prose-code:text-red-500 
//         prose-code:before:content-[''] prose-code:after:content-[''] w-full"
//       />
//     );
//   };
  
//   export default MarkdownEditor;

























import React, { useRef, useState } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  linkPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import FileReferenceAutoComplete from './FileReferenceAutoComplete';

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (content: string) => void;
  onFileReference?: (filename: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdown,
  setMarkdown,
  onFileReference,
}) => {
  const [showFileAutocomplete, setShowFileAutocomplete] = useState(false);
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const editorRef = useRef<MDXEditorMethods>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleEditorChange = async (content: string) => {
    setMarkdown(content);
    console.log('Content changed:', content);
    
    // Check if the last four characters typed are \[\[
    const lastFourChars = content.slice(-4);
    if (lastFourChars === '\\[\\[') {
      console.log('file reference detected');
      const files = await window.electronAPI.listFiles();
      setAvailableFiles(files);
      setShowFileAutocomplete(true);
    } 
    // Check if we're in the middle of a file reference
    else if (content.includes('\\[\\[')) {
      const match = content.match(/\\\[\\\[([^\]]+)$/);
      if (match) {
        console.log('searching:', match[1]);
        const files = await window.electronAPI.listFiles();
        setAvailableFiles(files.filter(file => 
          file.toLowerCase().includes(match[1].toLowerCase())
        ));
        setShowFileAutocomplete(true);
      } else {
        setShowFileAutocomplete(false);
      }
    } else {
      setShowFileAutocomplete(false);
    }
  };
  
  const handleFileSelect = (filename: string) => {
    console.log('File selected:', filename);
    const content = editorRef.current?.getMarkdown() || '';
    console.log('Current content:', content);
    
    // Find the last \[\[ that doesn't have a closing \]\]
    const lastOpenBrackets = content.lastIndexOf('\\[\\[');
    console.log('Last \[\[ at:', lastOpenBrackets);
    
    if (lastOpenBrackets !== -1) {
      const displayName = filename.replace('.md', '');
      const newContent = 
        content.slice(0, lastOpenBrackets) + 
        // `\\[\\[${filename}\\]\\]` + 
        // content.slice(lastOpenBrackets + 4); // Changed from +2 to +4 because of escaped brackets
        `[${displayName}](${filename})` + 
        content.slice(lastOpenBrackets + 4);

      console.log('New content:', newContent);
      editorRef.current?.setMarkdown(newContent);
      setMarkdown(newContent);
    }
    setShowFileAutocomplete(false);
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    console.log('Click detected');
    const target = event.target as HTMLElement;
    console.log('Clicked element:', target.tagName, target);
    
    // Try to find the closest anchor tag (in case we clicked on a child element)
    const linkElement = target.closest('a');
    console.log('Found link element:', linkElement);

    if (linkElement) {
      event.preventDefault();
      const filename = linkElement.getAttribute('href');
      console.log('Found filename:', filename);
      if (filename && onFileReference) {
        onFileReference(filename);
      }
    }
  };

  return (
    <div 
      className="relative" 
      onClick={handleLinkClick}
    >
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        onChange={handleEditorChange}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
        ]}
        contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] w-full"
      />
      <FileReferenceAutoComplete
        files={availableFiles}
        isOpen={showFileAutocomplete}
        onSelect={handleFileSelect}
        triggerRef={triggerRef}
      />
    </div>
  );
};

export default MarkdownEditor;