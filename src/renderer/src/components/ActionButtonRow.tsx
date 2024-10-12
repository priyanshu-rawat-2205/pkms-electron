import { ComponentProps } from 'react'
import { CollapseButton, DeleteNoteButton, GraphViewButton, NewNoteButton } from './Button'

export type ActionButtonRowProps = ComponentProps<'div'> & {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  graphView: boolean
  setGraphView: React.Dispatch<React.SetStateAction<boolean>>
}

export const ActionButtonsRow = ({
  graphView,
  setGraphView,
  expanded,
  setExpanded,
  ...props
}: ActionButtonRowProps) => {
  return (
    <div {...props}>
      <CollapseButton expanded={expanded} setExpanded={setExpanded} />
      <NewNoteButton />
      <DeleteNoteButton />
      <GraphViewButton graphView={graphView} setGraphView={setGraphView} />
    </div>
  )
}
