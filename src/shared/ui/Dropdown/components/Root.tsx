'use client'

import { PropsWithChildren, useState } from 'react'

import { DropdownProvider } from './Provider'
import { Root as RadixRoot } from './radix'

export interface DropdownRootProps extends PropsWithChildren {
  isVisible?: boolean
  setVisible?: (newVisible: boolean) => void
}

const Root = ({ children, isVisible, setVisible }: DropdownRootProps) => {
  const [_isVisible, _setVisible] = useState(false)

  const openStatus = isVisible ?? _isVisible
  const setOpenStatus = setVisible ?? _setVisible

  return (
    <DropdownProvider isVisible={openStatus} setVisible={setOpenStatus}>
      <RadixRoot dir={"inherit" as any} open={openStatus} onOpenChange={setOpenStatus}>
        {children}
      </RadixRoot>
    </DropdownProvider>
  );
}

export default Root
