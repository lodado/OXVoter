'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_BOOKMARKS = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <path
            d="M14.6442 4.44041H7.35579C6.55406 4.44041 5.8981 5.09637 5.8981 5.8981V17.5596L11 15.3731L16.1019 17.5596V5.8981C16.1019 5.09637 15.4459 4.44041 14.6442 4.44041Z"
            fill="#C1C1C1"
          />
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_BOOKMARKS
