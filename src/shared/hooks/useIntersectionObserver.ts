"use client";

import { useEffect, useRef } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** 옵저버를 활성화할지 여부 */
  enabled?: boolean;
}

/**
 * useIntersectionObserver
 *
 * @param onIntersect - 대상 엘리먼트가 교차할 때 실행될 콜백 함수
 * @param options - IntersectionObserver 옵션 (enabled: 사용여부 포함)
 * @returns 대상 엘리먼트를 설정할 ref
 */
export default function useIntersectionObserver(
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
  options: UseIntersectionObserverOptions = { threshold: 1.0, enabled: true }
) {
  // options에서 enabled 값을 추출하고, 나머지는 IntersectionObserver 옵션으로 사용
  const { enabled = true, ...observerOptions } = options;
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return; // 옵저버 사용이 비활성화되어 있으면 종료

    const element = targetRef.current;
    if (!element) return; // ref가 아직 설정되지 않았으면 종료

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        // 대상 엘리먼트가 교차 영역에 들어오면 onIntersect 콜백 실행
        if (entry.isIntersecting) {
          onIntersect(entry, observerInstance);
        }
      });
    }, observerOptions);

    observer.observe(element);

    // 정리(cleanup): 컴포넌트 언마운트 또는 의존성 변경 시 옵저버 해제
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [enabled, observerOptions, onIntersect]);

  return targetRef;
}
