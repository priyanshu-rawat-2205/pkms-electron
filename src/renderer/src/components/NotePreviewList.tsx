import { notesMock } from '@renderer/store/mocks'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  if (notesMock.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>Whats On Your Mind...</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notesMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
