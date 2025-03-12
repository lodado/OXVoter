"use client";

import debounce from "lodash-es/debounce";
import { useEffect } from "react";
 

// Hook 타입 정의
interface UseWindowResizeProps {
  resizeCallback: () => void;
  debounceTime?: number; // 디바운스 시간을 선택적으로 설정 가능, 기본값은 200ms
}

const useWindowResize = ({ resizeCallback, debounceTime = 200 }: UseWindowResizeProps) => {
  useEffect(() => {
    // 디바운스 적용된 resize 함수
    const debouncedResize = debounce(resizeCallback, debounceTime);

    // 초기 실행
    debouncedResize();

    // resize 이벤트에 디바운스된 함수 연결
    window.addEventListener("resize", debouncedResize);

    // 클린업
    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel(); // lodash 디바운스 함수의 클린업
    };
  }, [resizeCallback, debounceTime]);
};

export default useWindowResize;
