"use client";

import { Viewport } from "@radix-ui/react-toast";

import { cn, isRtl } from "@/shared";

const ToastViewPort = ({ className }: { className?: string }) => {
  const dir = isRtl() ? "rtl" : "ltr";

  return (
    <Viewport
      dir={dir}
      className={cn(
        `
    fixed bottom-0 left-1/2 
    ${dir === "rtl" ? "translate-x-1/2" : "-translate-x-1/2"}
    transform  
    flex flex-col items-center
    w-[calc(100%-3rem)] max-w-[29rem] 
    gap-2
    z-50
  `,
        className
      )}
    />
  );
};

export default ToastViewPort;
