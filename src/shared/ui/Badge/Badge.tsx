import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils";

import { badgeVariants } from "./style";

const Badge = ({
  children,
  className,
  variant = "line",
  ...rest
}: { className?: string; children: ReactNode } & VariantProps<typeof badgeVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
