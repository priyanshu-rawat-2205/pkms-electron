import { GraphNodeDataAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export const useGraphNode = () => {
  const GraphNode = useAtomValue(GraphNodeDataAtom)
  return GraphNode
}

// export const [graphNodes, setGraphNodes] = useAtom(GraphNodeAtom)

// export const getGraphNodeData = () => {
//   setGraphNodes(GraphNode)
// }
