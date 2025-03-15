import React, { PropsWithChildren, ReactNode } from "react";

import { cn } from "@/shared/utils";

const ReactiveLayout = ({
  children,
  outerClassName,
  outerChildren,
  className,
}: { outerClassName?: string; className?: string; outerChildren?: ReactNode } & PropsWithChildren) => {
  return (
    <div className={cn("flex w-full h-max min-h-[calc(100*var(--vh))] items-center justify-center ", outerClassName)}>
      {outerChildren}

      <div
        className={cn(
          "w-full h-full min-h-[calc(100*var(--vh))]  md:w-[768px] mx-auto flex flex-col items-center",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ReactiveLayout;
