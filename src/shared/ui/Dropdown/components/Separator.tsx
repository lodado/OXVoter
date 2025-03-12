import React from "react";

import { cn } from "@/shared/utils";

import { Separator } from "./radix";

const DropdownSeparator = ({ className }: { className?: string }) => (
  <Separator className={cn("h-[1px] my-[0.125rem] bg-border-02 w-full", className)} />
);

export default DropdownSeparator;
