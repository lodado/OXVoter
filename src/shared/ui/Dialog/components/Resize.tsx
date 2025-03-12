"use client";

import React from "react";

import { useDialogResizer } from "../hooks/useDialogResizer";

export const RESIZE_DRAG_TYPE = "DIALOG_RESIZER";

// 드래그 핸들(동그란 버튼)
export function ResizerHandle() {
  const { isDragging, dragRef, dropRef } = useDialogResizer();
  return (
    <>
      {isDragging && (
        <>
          <div
            ref={dropRef as any}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000000000000,
              width: "100vw",
              height: "100vh",
              opacity: 0,
            }}
          ></div>
        </>
      )}

      <div className="w-full min-h-4 h-full flex justify-center items-center" ref={dragRef as any}>
        <div role="none presentation" className="w-[3rem] h-1 rounded-[100px] bg-border-borderOpaque  " />
      </div>
    </>
  );
}
