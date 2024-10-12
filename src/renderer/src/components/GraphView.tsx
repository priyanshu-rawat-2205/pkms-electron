import { Background, Controls, ReactFlow } from '@xyflow/react'

export type GraphNodeProp = {
  nodes: {
    id: string
    position: {
      x: number
      y: number
    }
    data: {
      label: string
    }
  }[]
}

export const GraphView = ({ nodes }: GraphNodeProp) => {
  return (
    <div className="w-screen h-screen text-black">
      <ReactFlow fitView nodes={nodes}>
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
