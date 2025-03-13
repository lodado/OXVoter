import { cva } from 'class-variance-authority'

export const rawButtonVariants = cva(
  `rounded-[12px] select-none touch-none flex  py-2 justify-center items-center gap-0.5 head-3 flex-shrink-0 self-stretch cursor-pointer disabled:cursor-not-allowed disabled:opacity-30`,
  {
    variants: {
      variant: {
        link: "h-14 px-4 text-text-primary flex flex-row gap-1",
        errorSolid: " h-14 bg-error px-4 text-text-00 active:bg-error-press",
        errorLine:
          " border border-solid border-error h-14 px-4 bg-transparent active:bg-error-01-line-press text-text-error",

        primarySolid: "h-14 bg-primary-01 px-4 text-text-00 active:bg-primary-01-press",
        primaryLine: "border border-solid border-primary-01 h-14 px-4 bg-transparent text-text-primary",
        line: "flex items-center h-[1.875rem] gap-[0.25rem] pl-[0.625rem] pr-[0.75rem]  border border-solid border-border-02 bg-background-01 active:bg-tertiary-op-press  ",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "primarySolid",
    },
  }
);

export const buttonVariants = cva("", {
  variants: {
    size: {
      // primarymedium: 'h-9 px-spacing-3 py-spacing-1',
      // primarylarge: 'h-10 px-spacing-4 py-spacing-3',
      // primarysmall: 'h-6 px-spacing-2 py-spacing-1',
      custom: "",
    },
  },
  defaultVariants: {
    size: "custom",
  },
});

export const iconButtonVariants = cva("", {
  variants: {
    size: {
      medium: "p-2",
      large: "p-2",
      small: "p-1",
      custom: "",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const LeftButtonIconVariants = cva(``, {
  variants: {
    size: {
      medium: "[&>svg]:w-5 [&>svg]:h-5",
      large: "[&>svg]:w-6 [&>svg]:h-6",
      small: "[&>svg]:w-5 [&>svg]:h-5",
      custom: "",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const RightButtonIconVariants = cva(``, {
  variants: {
    size: {
      medium: "[&>svg]:w-3 [&>svg]:h-3",
      large: "[&>svg]:w-4 h-4",
      small: "[&>svg]:w-3 [&>svg]:h-3",
      custom: "",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
