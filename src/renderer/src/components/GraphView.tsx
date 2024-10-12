import { useGraphNode } from '@renderer/hooks/useGraphNode'
import { Background, Controls, ReactFlow } from '@xyflow/react'

export const GraphView = () => {
  const GraphNode = useGraphNode()
  return (
    <div className="w-screen h-screen text-black">
      <ReactFlow fitView nodes={GraphNode}>
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
