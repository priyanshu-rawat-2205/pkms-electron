import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type SidebarProps = ComponentProps<'aside'> & {
  expanded: boolean
  setOpen?: () => void
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ expanded, setExpanded, className, children, ...props }: SidebarProps) => {
  return (
    <aside
      className={twMerge(
        `${expanded ? 'w-[250px] overflow-auto' : 'w-0 overflow-hidden'} duration-500 h-[100vh + 10px]`,
        className
      )}
      {...props}
    >
      {expanded ? children : null}
      {/* {children} */}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
