"use client";

import { ComponentProps } from "react";

import { cn } from "@/shared/utils";

import { rawButtonVariants } from "../../Button/style";
import { Trigger } from "./radix";

const SelectTrigger = (props: ComponentProps<typeof Trigger> & ComponentProps<typeof rawButtonVariants>) => {
  const { children, className, variant = "custom", ...rest } = props;

  return (
    <Trigger
      dir="inherit"
      className={cn(
        "inline-flex items-center rounded-md px-4 py-2 text-sm leading-none  gap-2 bg-transparent border border-border-2 text-text-01",
        rawButtonVariants({ variant }),
        "justify-between w-min",
        className
      )}
      {...rest}
    >
      {children}
    </Trigger>
  );
};

export default SelectTrigger;
