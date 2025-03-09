import { createNodeType, NodeViewProps } from '@mdxeditor/editor';

// Create a custom node type for file references
export const fileReferenceType = createNodeType({
  name: 'fileReference',
  spec: {
    content: 'text*',
    group: 'inline',
    inline: true,
    atom: true,
  },
});

// Create a React component to render the file reference
const FileReferenceComponent: React.FC<NodeViewProps> = ({ node, children }) => {
  const filename = node.textContent;
  const displayName = filename.replace('.md', ''); // Remove .md extension

  return (
    <span 
      className="text-blue-400 hover:text-blue-300 cursor-pointer"
      data-filename={filename}
    >
      {displayName}
    </span>
  );
};

// Create the plugin
export const fileReferencePlugin = () => {
  return {
    plugins: [
      {
        key: 'fileReference',
        view: FileReferenceComponent,
        nodeType: fileReferenceType,
      },
    ],
    transformers: [
      {
        // Transform [[filename]] to custom node
        matcher: /\[\[([^\]]+)\]\]/g,
        transform: (match: string[], _content: string) => {
          return {
            type: 'fileReference',
            content: [{ type: 'text', text: match[1] }],
          };
        },
      },
    ],
  };
};