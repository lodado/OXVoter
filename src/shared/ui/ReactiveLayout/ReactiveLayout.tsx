import React, { PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

const ReactiveLayout = ({ children, className }: { className?: string } & PropsWithChildren) => {
  return (
    <div className="flex w-full h-max min-h-[calc(100*var(--vh))] items-center justify-center ">
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
