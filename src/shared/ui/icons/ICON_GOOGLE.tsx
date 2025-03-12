'use client'

import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

import processNode from './processNode'

interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
  fillOverwrite?: string
}

const ICON_GOOGLE = memo((props: SVGPropsExtended) => {
  const { fillOverwrite, ...rest } = props

  return (
    <>
      {Children.map(
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <g clipPath="url(#clip0_891_12)">
            <path
              d="M8.99986 7.36361V10.8491H13.8435C13.6308 11.97 12.9925 12.9191 12.0353 13.5573L14.9562 15.8237C16.658 14.2528 17.6398 11.9455 17.6398 9.20461C17.6398 8.56644 17.5826 7.95274 17.4762 7.36371L8.99986 7.36361Z"
              fill="#4285F4"
            />
            <path
              d="M3.95601 10.713L3.29723 11.2173L0.965378 13.0336C2.44628 15.9709 5.48151 18 8.99967 18C11.4296 18 13.4669 17.1982 14.956 15.8237L12.0351 13.5573C11.2333 14.0973 10.2105 14.4246 8.99967 14.4246C6.65968 14.4246 4.67156 12.8455 3.95969 10.7182L3.95601 10.713Z"
              fill="#34A853"
            />
            <path
              d="M0.965384 4.96636C0.351781 6.17722 0 7.5436 0 8.99994C0 10.4563 0.351781 11.8227 0.965384 13.0335C0.965384 13.0417 3.95998 10.7099 3.95998 10.7099C3.77998 10.1699 3.67359 9.5972 3.67359 8.99985C3.67359 8.4025 3.77998 7.82981 3.95998 7.28981L0.965384 4.96636Z"
              fill="#FBBC05"
            />
            <path
              d="M8.99985 3.58363C10.3253 3.58363 11.5035 4.0418 12.4444 4.92545L15.0216 2.34821C13.4589 0.891874 11.4299 0 8.99985 0C5.4817 0 2.44628 2.02091 0.965378 4.96637L3.95988 7.29001C4.67166 5.16271 6.65986 3.58363 8.99985 3.58363Z"
              fill="#EA4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_891_12">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>,
        (child) => processNode(child, fillOverwrite),
      )}
    </>
  )
})

export default ICON_GOOGLE
