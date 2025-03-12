'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_BOOKMARK = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <path
            d="M14.1667 2.5H5.83333C4.91666 2.5 4.16666 3.25 4.16666 4.16667V17.5L9.99999 15L15.8333 17.5V4.16667C15.8333 3.25 15.0833 2.5 14.1667 2.5Z"
            fill="#FFC71E"
          />
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_BOOKMARK
