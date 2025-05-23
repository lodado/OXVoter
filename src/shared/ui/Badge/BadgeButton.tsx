import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils";

import { badgeVariants } from "./style";

const BadgeButton = ({
  children,
  className,
  variant = "line",
  ...rest
}: { className?: string; children: ReactNode } & VariantProps<typeof badgeVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
    </button>
  );
};

export default BadgeButton;
