'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_NAVER = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <g clipPath="url(#clip0_891_16)">
            <path d="M10.8491 8.56267L4.91687 0H0V16H5.15088V7.436L11.0831 16H16V0H10.8491V8.56267Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_891_16">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_NAVER
