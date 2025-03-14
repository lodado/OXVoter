"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn, isRtl } from "@/shared/utils";

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const dir = isRtl() ? "rtl" : "ltr";

  return (
    <ProgressPrimitive.Root
      dir={dir}
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded border border-solid bg-transparent border-text-primary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-text-primary transition-all "
        style={{
          transform: dir === "rtl" ? `translateX(${100 - (value || 0)}%)` : `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});
ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export default ProgressBar;
