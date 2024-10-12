import { Handle, Position } from '@xyflow/react'

const handleStyle = { left: 10 }

export const FlowNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  )
}
