import { HiMenu } from 'react-icons/hi'
import { ActionButton, ActionButtonProps } from './ActionButton'

// const [open, setOpen] = useState(true)

export type CollapseButtonProps = ActionButtonProps & {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export const CollapseButton = ({ expanded, setExpanded, ...props }: CollapseButtonProps) => {
  return (
    <ActionButton onClick={() => setExpanded(!expanded)} {...props}>
      <HiMenu />
    </ActionButton>
  )
}
