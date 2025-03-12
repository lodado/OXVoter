"use client";

import { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

import { Arrow, Content, Portal, SubContent } from "./radix";

interface DropdownContentProps extends ComponentProps<typeof Content> {
  className?: string;
  isSub?: boolean;
  [key: string]: any;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ children, className, isSub, ...rest }) => {
  const Box = isSub ? SubContent : Content;

  return (
    <Portal>
      <Box
        className={cn(
          "mt-[4px] dropdown-shadow rounded bg-background-01 flex flex-col px-[4px] py-1 z-dropdown",
          className
        )}
        {...rest}
      >
        {children}
      </Box>
    </Portal>
  );
};

export default DropdownContent;
