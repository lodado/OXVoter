import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  `flex flex-row h-7 min-w-[2.8rem] gap-1 px-2 py-1 rounded-2xl items-center justify-center hover:cursor-default
`,
  {
    variants: {
      variant: {
        line: `border border-border-02 text-text-03 bg-background-01 
        active:bg-tertiary-press 
        `,
        isSelected: `border border-black fill-text-primary text-text-default bg-black`,
        isNotSelected: `border border-border-02 text-text-03 bg-background-01`,

        primary: `border border-text-primary text-text-primary bg-background-01`,
        success: `border border-text-success text-text-success bg-background-01`,
        error: `border border-text-error text-text-error bg-background-01`,
        warning: `border border-text-warning text-text-warning bg-background-01`,
        yellow: `border border-text-yellow text-text-yellow bg-background-01`,
        cancel: `border border-cancel text-cancel bg-background-01`,
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
);
