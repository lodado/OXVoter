"use client";

import { debounce, throttle } from "lodash-es";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";

import { useDialogContext } from "../components";

export const RESIZE_DRAG_TYPE = "DIALOG_RESIZER";

export const useDialogResizer = () => {
  const { height, setHeight, onChangeVisibleStatus, swipePercent } = useDialogContext();
  const [MAX_CHANGE_HEIGHT_LIMIT] = useState(window.innerHeight * swipePercent!);

  const heightRef = useRef(0);
  const manager = useDragDropManager();

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: RESIZE_DRAG_TYPE,
      item: { type: RESIZE_DRAG_TYPE },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),

      end: () => {
        heightRef.current = 0;
        setHeight(0);
      },
    }),
    []
  );

  const handleHover = useCallback(
    (item: { type: string }, monitor: any) => {
      if (item.type !== RESIZE_DRAG_TYPE) return;

      if (heightRef.current >= MAX_CHANGE_HEIGHT_LIMIT) {
        onChangeVisibleStatus(false);
        setHeight(0);
        manager.getActions().endDrag();
        return;
      }

      const currentOffset = monitor.getDifferenceFromInitialOffset();
      if (!currentOffset) return;

      const deltaY = currentOffset.y;

      const newHeightPercent = Math.min(MAX_CHANGE_HEIGHT_LIMIT, Math.max(0, height + deltaY));

      heightRef.current = newHeightPercent;
      setHeight(newHeightPercent);
    },
    [height, onChangeVisibleStatus, setHeight, manager]
  );

  /**
   * handleHover를 throttle로 감싼 함수
   *  - 100(ms)마다 한 번만 실행되도록 제한(필요에 따라 조정)
   *  - leading, trailing 옵션도 필요하다면 두 번째 파라미터에 지정
   */
  const throttledHover = useMemo(() => throttle(handleHover, 50), [handleHover]);

  useEffect(() => {
    return () => {
      throttledHover.cancel();
    };
  }, [throttledHover]);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: RESIZE_DRAG_TYPE, // 드래그 가능한 아이템의 타입
    hover: throttledHover,
    collect: (monitor) => ({
      isOver: monitor.isOver(), // 드롭 대상 위에 있는지 여부
    }),
  }));

  return { height, isDragging, dragRef, dropRef };
};
