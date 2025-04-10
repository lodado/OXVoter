"use client";

import { useEffect } from "react";

export function useCleanUp(callback: () => void): void {
  useEffect(() => {
    return () => {
      callback();
    };
  }, []);
}
