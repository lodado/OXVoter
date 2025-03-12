"use client";

import { Check } from "lucide-react";
import React from "react";

import { cn } from "@/shared/utils";

import { Item, ItemIndicator, ItemText } from "./radix";

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem = React.forwardRef(({ children, className, ...props }: SelectItemProps, forwardedRef) => (
  <Item
    className={cn(
      "flex items-center h-6 px-6 text-sm leading-none text-color-text-default rounded-sm relative select-none body-02",
      "focus:outline-color-text-brand focus:outline focus:outline-1 focus:ring-2 hover:z-50",
      "data-[disabled]:text-color-icon-disabled  data-[disabled]:pointer-events-none",
      "data-[highlighted]:text-color-text-brand",
      className
    )}
    {...props}
    ref={forwardedRef as React.RefObject<HTMLDivElement>}
  >
    <ItemText>{children}</ItemText>
    <ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center text-color-icon-accent-green">
      <Check />
    </ItemIndicator>
  </Item>
));

SelectItem.displayName = "SelectItem";

export default SelectItem;
