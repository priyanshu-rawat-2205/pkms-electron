import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// export const TopBar = () => {
//   return <header className="abosulute inset-0 h-8" />
// }

export const TopBar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <header className={twMerge('abosulute inset-0 h-6', className)} {...props}>
      {children}
    </header>
  )
}
