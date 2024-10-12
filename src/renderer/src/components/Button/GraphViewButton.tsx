import { PiGraph } from 'react-icons/pi'
import { ActionButton, ActionButtonProps } from './ActionButton'

export type GraphViewButtonProps = ActionButtonProps & {
  graphView: boolean
  setGraphView: React.Dispatch<React.SetStateAction<boolean>>
}

export const GraphViewButton = ({ graphView, setGraphView, ...props }: GraphViewButtonProps) => {
  return (
    <ActionButton
      onClick={() => {
        setGraphView(!graphView)
      }}
      {...props}
    >
      <PiGraph />
    </ActionButton>
  )
}
