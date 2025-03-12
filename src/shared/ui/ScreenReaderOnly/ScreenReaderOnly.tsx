import { Slot } from '@radix-ui/react-slot'
import { ComponentProps, PropsWithChildren } from 'react'

export interface ScreenReaderOnlyProps extends PropsWithChildren, ComponentProps<typeof Slot> {
  asChild?: boolean
}
const ScreenReaderOnly = ({ children, asChild = false }: ScreenReaderOnlyProps) => {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        borderWidth: 0,
        clip: 'rect(0 0 0 0)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Comp>
  )
}

export default ScreenReaderOnly
