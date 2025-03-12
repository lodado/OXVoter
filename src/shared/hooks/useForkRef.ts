import { MutableRefObject,Ref, useMemo } from "react";

function setRef<T>(ref: Ref<T> | undefined | null, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}

function useForkRef<T>(...refs: Array<Ref<T> | null | undefined>): Ref<T> | null {
  return useMemo(() => {
    if (refs.every((ref) => !ref)) {
      return null;
    }
    return (refValue: T | null) => {
      refs.forEach((ref) => {
        setRef(ref, refValue);
      });
    };
  }, [refs]);
}

export default useForkRef;
