'use client'

import React, { ReactNode } from 'react'

import { TooltipContent, TooltipTrigger } from './components/compound'
import { Provider, Root } from './components/radix'

interface TooltipProps {
  /**
   * The content to display within the tooltip. Accepts any React node (e.g., text, elements).
   */
  children: ReactNode

  /**
   * Controls tooltip visibility. `true` shows the tooltip, `false` hides it. Unspecified defaults to internal state control.
   */
  open?: boolean

  /**
   * Sets initial tooltip visibility in uncontrolled mode. `true` for open, `false` for closed.
   */
  defaultOpen?: boolean

  /**
   * Callback for tooltip visibility changes. Useful for managing state in controlled components.
   */
  onOpenChange?: () => void
}

const Tooltip = ({  children, open, defaultOpen, onOpenChange }: TooltipProps) => {
  return (
    <Provider delayDuration={0}>
      <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </Root>
    </Provider>
  );
};

Tooltip.displayName = 'Tooltip'

Tooltip.Trigger = TooltipTrigger

Tooltip.Content = TooltipContent

export default Tooltip
