"use client";

import { createDragDropManager } from "dnd-core";
import React, { PropsWithChildren, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

function getGlobalContext() {
  return typeof global !== "undefined" ? global : (window as any);
}

const ReactDndProvider = ({ children }: PropsWithChildren) => {
  /**
   * manager로 고정하지 않을 시
   * react unmount-mount때 touchBackend가 2개 이상이라고 인식하는 타이밍 이슈가 있음
   * https://github.com/react-dnd/react-dnd/issues/3119
   */
  const dndManager = useMemo(() => {
    return createDragDropManager(TouchBackend, getGlobalContext(), { enableMouseEvents: true }, false);
  }, []);

  return <DndProvider manager={dndManager}>{children}</DndProvider>;
};

export default ReactDndProvider;
