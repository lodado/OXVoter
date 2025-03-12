'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_GNB_1 = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <path
            d="M3.33334 5H1.66667V16.6667C1.66667 17.5833 2.41667 18.3333 3.33334 18.3333H15V16.6667H3.33334V5ZM16.6667 1.66666H6.66667C5.75001 1.66666 5.00001 2.41666 5.00001 3.33333V13.3333C5.00001 14.25 5.75001 15 6.66667 15H16.6667C17.5833 15 18.3333 14.25 18.3333 13.3333V3.33333C18.3333 2.41666 17.5833 1.66666 16.6667 1.66666ZM14.1667 3.33333V7.5L13.3333 6.875L12.5 7.5V3.33333H14.1667ZM16.6667 13.3333H6.66667V3.33333H10.8333V10.8333L13.3333 8.95833L15.8333 10.8333V3.33333H16.6667V13.3333Z"
            fill="#FFC71E"
          />
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_GNB_1
