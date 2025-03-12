"use client";

import { motion, useAnimation, useMotionValue } from "motion/react";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import { isRtl } from "@/shared/utils";

import { useSwipeContext } from "./SwipeableItemProvider";

interface SwipeableItemProps {
  itemId?: string;
  leftSwipeLimit?: number; // LTR에서는 음수 (예: -50), RTL에서는 절대값만 사용 (예: 50)
  children: React.ReactNode;
  swipeOptionChildren: React.ReactNode;
  onSwipeLeft?: () => void;
  resetOnOtherSwipe?: boolean;
}

export const SwipeOptionContainer = ({ isSwiped, children }: PropsWithChildren & { isSwiped: boolean }) => {
  const isRTL = isRtl();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isSwiped ? 1 : 0 }}
      transition={{ duration: 0 }}
      // LTR: originX가 1, 오른쪽에 위치; RTL: originX는 0, 왼쪽에 위치
      style={{ originX: isRTL ? 0 : 1 }}
      className={"absolute right-0 top-0 inset-0 flex h-full justify-end items-center"}
    >
      {children}
    </motion.div>
  );
};

const SwipeableItem: React.FC<SwipeableItemProps> = ({
  leftSwipeLimit = -50,
  children,
  swipeOptionChildren,
  onSwipeLeft,
  resetOnOtherSwipe = false,
  itemId,
}) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isSwiped, setIsSwiped] = useState(false);
  const { swipedItemId, setSwipedItemId } = useSwipeContext() ?? {
    swipedItemId: "-1",
    setSwipedItemId: () => {},
  };

  const idRef = useRef(itemId || Math.random().toString(36).substr(2, 9));
  // 현재 RTL 여부 감지 (LTR이면 false, RTL이면 true)
  const isRTL = isRtl();
  // LTR에서는 leftSwipeLimit이 음수 값, RTL에서는 절대값(양수) 사용
  const effectiveSwipeLimit = isRTL ? Math.abs(leftSwipeLimit) : leftSwipeLimit;

  useEffect(() => {
    if (resetOnOtherSwipe && swipedItemId !== idRef.current && isSwiped) {
      controls.start({ x: 0 });
      setIsSwiped(false);
    }
  }, [swipedItemId, resetOnOtherSwipe, isSwiped, controls]);

  const handleDrag = async (event: any, info: { offset: { x: number } }) => {
    const thresholdMet = isRTL ? info.offset.x > effectiveSwipeLimit / 2 : info.offset.x < effectiveSwipeLimit / 2;

    if (thresholdMet) {
      await controls.start({ x: effectiveSwipeLimit });
      setIsSwiped(true);
      onSwipeLeft?.();
      if (resetOnOtherSwipe) {
        setSwipedItemId(idRef.current);
      }
      return;
    }

    await controls.start({ x: 0 });
    setIsSwiped(false);
    if (resetOnOtherSwipe && swipedItemId === idRef.current) {
      setSwipedItemId(null);
    }
  };

  return (
    <div className="relative">
      <motion.div
        drag="x"
        // LTR: 왼쪽으로만 드래그, RTL: 오른쪽으로만 드래그하도록 제약조건 설정
        dragConstraints={isRTL ? { left: 0, right: effectiveSwipeLimit } : { left: effectiveSwipeLimit, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        animate={controls}
        onDragEnd={handleDrag}
        className="relative z-[5]"
      >
        {children}
      </motion.div>

      <SwipeOptionContainer isSwiped={isSwiped}>{swipeOptionChildren}</SwipeOptionContainer>
    </div>
  );
};

export default SwipeableItem;
