"use client";

import throttle from "lodash/throttle";
import { useEffect, useState } from "react";

export type UseScrollTriggerOptions = {
  threshold: number; // 스크롤 트리거 임계값 (px)
  onTrigger?: () => void; // 특정 스크롤에 도달했을 때 실행될 함수
  onReset?: () => void; // 다시 threshold 위로 올라갔을 때 실행할 함수 (선택 사항)
};

const useScrollTrigger = ({ threshold, onTrigger, onReset }: UseScrollTriggerOptions) => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop >= threshold && !triggered) {
        setTriggered(true);
        onTrigger?.();
      } else if (scrollTop < threshold && triggered) {
        setTriggered(false);

        onReset?.();
      }
    }, 50); // 100ms 단위로 스로틀링

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, onTrigger, onReset, triggered]);

  return { triggered };
};

export default useScrollTrigger;
