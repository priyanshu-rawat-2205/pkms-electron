import { ComponentProps } from 'react'
import { CollapseButton, DeleteNoteButton, NewNoteButton } from './Button'

export type ActionButtonRowProps = ComponentProps<'div'> & {
  expanded: boolean
  setOpen?: () => void
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export const ActionButtonsRow = ({ expanded, setExpanded, ...props }: ActionButtonRowProps) => {
  return (
    <div {...props}>
      <CollapseButton expanded={expanded} setExpanded={setExpanded} />
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
