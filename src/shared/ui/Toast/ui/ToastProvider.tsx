"use client";

import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import Error from "/public/Error.svg";
import Success from "/public/Success.svg";
import { cn } from "@/shared";
import { Motion } from "@/shared/ui/animation/animation";

import { useToastStore } from "../stores/toastStore";
import { toastDescriptionVariants, toastHeadVariants, toastVariants } from "./style";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  // Zustand에서 메시지 목록, 제거 함수를 가져옴
  const { messages, clearToast, removeToast } = useToastStore();
  const pathname = usePathname();
  const [mount, setMount] = useState(pathname);

  // onOpenChange 시점에 메시지를 제거하는 핸들러
  const handleOpenChange = (id: string | number) => (open: boolean) => {
    if (!open) {
      removeToast(id);
    }
  };

  useEffect(() => {
    clearToast();
    setMount(pathname);
  }, [pathname]);

  return (
    <Toast.Provider duration={6000} swipeDirection="down">
      {children}

      {/* toast와 animation 간에 이상한 버그가 있어서 key로 명시적으로 rerendering 
      시켜줌*/}
      <AnimatePresence key={pathname + mount}>
        {messages.map((msg) => (
          <Toast.Root
            key={msg.id}
            open
            onOpenChange={handleOpenChange(msg.id)}
            // Tailwind 스타일

            // 클릭 시 즉시 제거
            onClick={() => removeToast(msg.id)}
            asChild
          >
            <Motion
              componentType="div"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              exit={{ y: 80, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
              layout
              className={cn(
                toastVariants({ type: msg.type }) // 타입별 스타일 적용
              )}
            >
              <div className="flex mb-2 h-[50px] flex-row items-center">
                {msg.type === "success" ? <Success /> : <Error />}

                <div className="flex  flex-col ">
                  <Toast.Title
                    className={cn(
                      toastHeadVariants({ type: msg.type }) // 타입별 스타일 적용
                    )}
                  >
                    {msg.title}
                  </Toast.Title>
                  {msg.description && (
                    <Toast.Description
                      className={cn(
                        toastDescriptionVariants({ type: msg.type }) // 타입별 스타일 적용
                      )}
                    >
                      {msg.description}
                    </Toast.Description>
                  )}
                </div>
              </div>
            </Motion>
          </Toast.Root>
        ))}
      </AnimatePresence>
    </Toast.Provider>
  );
}
