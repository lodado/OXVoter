"use client";

import "../index.scss";

import { ChevronDown,ChevronUp } from "lucide-react";
import { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

import { Content, Portal, ScrollDownButton, ScrollUpButton, Viewport } from "./radix";

 
const SelectContent = ({
  children,
  className,
  contentClassName,
  ...rest
}: PropsWithChildren & ComponentProps<typeof Content> & { contentClassName?: string; className?: string }) => (
  <Portal>
    <Content
      dir="inherit"
      position="popper"
      className={cn(
        `SelectContent overflow-hidden w-max z-dropdown bg-background border border-solid border-color-border-input rounded-lg shadow-dropdown mt-2`,
        contentClassName
      )}
      {...rest}
    >
      <ScrollUpButton className="flex items-center justify-center h-6 bg-background-default text-color-text-default cursor-default">
        <ChevronUp />
      </ScrollUpButton>
      <Viewport className={cn("p-2", className)}>{children}</Viewport>
      <ScrollDownButton className="flex items-center justify-center h-6 bg-background-default text-color-text-default cursor-default">
        <ChevronDown />
      </ScrollDownButton>
    </Content>
  </Portal>
);

export default SelectContent;
