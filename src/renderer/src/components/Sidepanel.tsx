import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Sidepanel = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={twMerge('w-[250px] h-[100vh + 10px] overflow-auto', className)} {...props}>
      {children}
    </aside>
  )
}
