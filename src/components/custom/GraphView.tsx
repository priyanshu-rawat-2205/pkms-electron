import React, { useCallback, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface GraphNode {
  id: string;
  name: string;
  val: number;
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface GraphViewProps {
  onNodeClick: (filename: string) => void;
  setViewMode: (mode: 'editor' | 'graph') => void;
}

const GraphView: React.FC<GraphViewProps> = ({ onNodeClick, setViewMode }) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });

  const buildGraphData = async () => {
    const files = await window.electronAPI.listFiles();
    const nodes: GraphNode[] = files.map(file => ({
      id: file,
      name: file.replace('.md', ''),
      val: 1
    }));

    const links: GraphLink[] = [];
    
    // Parse each file for references
    for (const file of files) {
      const content = await window.electronAPI.readFile(file);
      const references = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
      
      references.forEach(ref => {
        const match = ref.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match && files.includes(match[2])) {
          links.push({
            source: file,
            target: match[2]
          });
        }
      });
    }

    setGraphData({ nodes, links });
  };

  useEffect(() => {
    buildGraphData();
  }, []);

  const handleNodeDoubleClick = useCallback((node: any) => {
    onNodeClick(node.id);
    setViewMode('editor');
  }, [onNodeClick, setViewMode]);

  return (
    <div className="w-full h-full bg-gray-900">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeColor={() => "#60A5FA"}
        linkColor={() => "#4B5563"}
        onNodeClick={handleNodeDoubleClick}
        width={window.innerWidth - 100}
        height={window.innerHeight - 100}
      />
    </div>
  );
};

export default GraphView; 