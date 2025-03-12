import { cva } from 'class-variance-authority'

export const InputStyleVariants = cva(
  `p-4 pr-10 rounded border outline-1 border-border-02 bg-tertiary-op-press text-text-01 body-2 placeholder:text-text-placeholder caret-primary-01`,
  {
    variants: {
      variant: {
        default: `read-only:bg-color-text-brand
      `,
        invalid: `border-error focus-within:outline-1 focus-within:outline-error`,
      },

      size: {
        textArea: "h-20",
        medium: " w-full h-[2.75rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
);
