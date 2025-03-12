"use client";

import { Check } from "lucide-react";
import React from "react";

import { cn } from "@/shared/utils";

import { Item } from "./radix";

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Item> {
  children: React.ReactNode;
  className?: string;
}

const DropdownItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Item
        className={cn(
          "hover:cursor-pointer",
          "body-1 text-text-strong w-full h-[32px] flex gap-1 py-[6px] flex-shrink-0 pl-[6px] pr-[4px] align-center bg-tertiary",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Item>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

export default DropdownItem;
