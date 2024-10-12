import { GraphEdge, NoteInfo } from '@shared/models'

export const notesMock: NoteInfo[] = [
  {
    title: `Welcome 👋🏻`,
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 1',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 2',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 3',
    lastEditTime: new Date().getTime()
  }
]

export const graphNodeMock = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 200, y: 50 }, data: { label: '3' } }
]

export const graphEdgeMock: GraphEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3'
  }
]
