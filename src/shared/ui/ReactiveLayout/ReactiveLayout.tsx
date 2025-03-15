import React, { PropsWithChildren, ReactNode } from "react";

import { cn } from "@/shared/utils";

const ReactiveLayout = ({
  children,
  outerClassName,
  outerPreviousChildren,
  outerAfterChildren,
  className,
}: {
  outerClassName?: string;
  className?: string;
  outerAfterChildren?: ReactNode;
  outerPreviousChildren?: ReactNode;
} & PropsWithChildren) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-max min-h-[calc(100*var(--vh))] items-center justify-center ",
        outerClassName
      )}
    >
      {outerPreviousChildren}

      <div
        className={cn(
          "w-full h-full min-h-[calc(100*var(--vh))]  md:w-[768px] mx-auto flex flex-col items-center",
          className
        )}
      >
        {children}
      </div>

      {outerAfterChildren}
    </div>
  );
};

export default ReactiveLayout;
