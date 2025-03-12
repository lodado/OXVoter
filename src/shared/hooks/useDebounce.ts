"use client";

import { useCallback,useEffect, useRef } from "react";

// Generic type for any function
type CallbackFunction = (...args: any[]) => void;

const useDebounce = (callback: CallbackFunction, delay: number, deps: any[] = []) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      // Clear the timeout if it's already set
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...deps] // Include dependencies in the memoization
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedCallback]);

  return debouncedCallback;
};

export default useDebounce;
