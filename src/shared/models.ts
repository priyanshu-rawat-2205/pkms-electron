export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteContent = string

//graph node types

export type GraphNode = {
  id: string
  position: { x: number; y: number }
  data: { label: string }
}

export type GraphEdge = {
  id: string
  source: string
  target: string
}

export type graphMetaData = {
  node: {
    id: number
    position: { x: number; y: number }
    data: { label: string }
  }
  edge: {
    id: string
    source: string
    target: string
  }
}
