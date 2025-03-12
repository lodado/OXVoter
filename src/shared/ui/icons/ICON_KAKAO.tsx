'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_KAKAO = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <g clipPath="url(#clip0_891_18)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.00002 0.599998C4.02917 0.599998 0 3.71296 0 7.55228C0 9.94002 1.5584 12.045 3.93152 13.297L2.93303 16.9445C2.84481 17.2668 3.21341 17.5237 3.49646 17.3369L7.87334 14.4482C8.2427 14.4838 8.61808 14.5046 9.00002 14.5046C13.9705 14.5046 17.9999 11.3918 17.9999 7.55228C17.9999 3.71296 13.9705 0.599998 9.00002 0.599998Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_891_18">
              <rect width="17.9999" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_KAKAO
