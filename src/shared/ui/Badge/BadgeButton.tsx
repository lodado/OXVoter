import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils";

export const badgeButtonVariants = cva(
  `flex flex-row h-7 min-w-[2.8rem] gap-1 px-2 py-1 rounded-2xl items-center justify-center`,
  {
    variants: {
      variant: {
        line: `border border-border-02 text-text-03 bg-background-01 
        active:bg-tertiary-press 
        `,
        isSelected: `border border-primary-01 fill-text-primary text-text-primary bg-background-01`,
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
);

const BadgeButton = ({
  children,
  className,
  variant = "line",
  ...rest
}: { className?: string; children: ReactNode } & VariantProps<typeof badgeButtonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={cn(badgeButtonVariants({ variant }), className)} {...rest}>
      {children}
    </button>
  );
};

export default BadgeButton;
