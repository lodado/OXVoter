import { PopperContentProps } from "@radix-ui/react-popper";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps,HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared";

import { Arrow, Content, Portal, Provider, Root, Trigger } from "./radix";

// Define styles using class-variance-authority (cva)
const tooltipContentStyles = cva(
  "flex z-tooltip rounded gap-spacing-3 p-2 flex-start body-03 pt-spacing-1 pb-spacing-1 pl-spacing-3 pr-spacing-3 detail-02-r shadow-tooltip",
  {
    variants: {
      variant: {
        primary: "bg-color-background-input-default text-color-text-default",
        secondary: "bg-color-background-brand-boldest-default  text-background ",
        editor: "bg-[var(--Background-Editor-Tooltip)] text-[var(--Background-Editor-Tooltip-Text)]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface TooltipContentProps extends ComponentProps<typeof Content>, VariantProps<typeof tooltipContentStyles> {
  children: ReactNode;
  side?: PopperContentProps["side"];
  align?: PopperContentProps["align"];

  variant?: "primary" | "secondary" | "editor";
}

export const TooltipTrigger = ({ children }: { children: ReactNode }) => {
  return <Trigger asChild>{children}</Trigger>;
};

export const TooltipContent = ({
  className,
  children,
  side,
  align,
  variant = "primary",
  ...rest
}: TooltipContentProps) => {
  return (
    <Portal>
      <Content className={cn(tooltipContentStyles({ variant }), className)} side={side} align={align} {...rest}>
        {children}
      </Content>
    </Portal>
  );
};
