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
        `SelectContent overflow-y-auto overflow-x-hidden w-max z-dropdown bg-white border border-solid border-color-border-input rounded-lg shadow-dropdown mt-2`,
        contentClassName
      )}
      {...rest}
    >
      <ScrollUpButton className="flex items-center justify-center h-6 bg-background-default cursor-default">
        <ChevronUp className="text-text-01" />
      </ScrollUpButton>
      <Viewport className={cn("p-2 text-text-01", className)}>
        <>{children}</>
      </Viewport>
      <ScrollDownButton className="flex items-center justify-center h-6 bg-background-default cursor-default">
        <ChevronDown className="text-text-01" />
      </ScrollDownButton>
    </Content>
  </Portal>
);

export default SelectContent;
