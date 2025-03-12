// type.ts 파일 내용 수정
import { VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactElement, ReactNode, RefAttributes } from 'react'

import { rawButtonVariants } from './style'

/**
 * Defines the basic HTML button element attributes for further extension.
 */
export type ButtonElement = ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Describes the properties for the base button component, extending standard HTML button attributes
 * and variant props for styling. Includes properties for variant selection and size, as well as an
 * option to render the button as a child component without wrapper elements.
 */
export interface RawButtonProps extends ButtonElement, VariantProps<typeof rawButtonVariants> {
  componentType?: JSX.IntrinsicElements;

  className?: string;

  /** Defines the button's style variant
   * @default primary
   */
  variant?: "link" | "errorSolid" | "errorLine" | "primarySolid" | "primaryLine" | "custom" | "line";

  /** Determines the size of the button, with options including 'medium', 'large', 'small' or 'custom'.
   * @default 'custom'
   */
  size?: "custom";

  /**
   * @default false
   */
  disabled?: boolean;

  hoverAnimationDisabled?: boolean;
}

/**
 * Extends `RawButtonProps` to include optional properties for adding icons to the button.
 * Icons can be positioned on either the left or right side of the button's content.
 */
export interface ButtonProps extends RawButtonProps {
  /**
   * Optional. A React node for an icon to display on the left side of the button's content.
   */
  LeftIcon?: ReactNode

  /**
   * Optional. A React node for an icon to display on the right side of the button's content.
   */
  RightIcon?: ReactNode
}

/**
 * Describes the properties for an icon button component, which is a specialization of the
 * raw button that expects a single React element (typically an icon) as its child.
 */
export interface IconButtonProps extends RawButtonProps {
  /** The single child element, typically an icon, to be displayed inside the button. */
  children: ReactElement
}
