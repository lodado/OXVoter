import { useRef } from "react";

export function useScope<T extends object = {}>(): T {
  const scopeRef = useRef<T>();
  if (!scopeRef.current) {
    scopeRef.current = {} as T;
  }
  return scopeRef.current;
}
