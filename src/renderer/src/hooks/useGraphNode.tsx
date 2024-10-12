import { GraphNodeJSONAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export const useGraphNode = () => {
  const GraphNode = useAtomValue(GraphNodeJSONAtom)
  return GraphNode
}

// export const [graphNodes, setGraphNodes] = useAtom(GraphNodeAtom)

// export const getGraphNodeData = () => {
//   setGraphNodes(GraphNode)
// }
