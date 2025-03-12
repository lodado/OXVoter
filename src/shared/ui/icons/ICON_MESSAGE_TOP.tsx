'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_MESSAGE_TOP = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <path d="M4.4 2.13333C5.2 1.06667 6.8 1.06667 7.6 2.13333L12 8L0 8L4.4 2.13333Z" fill="black" />
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_MESSAGE_TOP
