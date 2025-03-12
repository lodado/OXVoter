"use client";

import { useReducer } from "react";

/**
 * Custom hook that forces a component to re-render.
 *
 * This hook utilizes a dummy state managed by `useReducer` to trigger a re-render
 * when the returned function is called.
 *
 * @returns {() => void} A function that, when called, forces the component to re-render.
 */
const useForceRenderer = () => {
  const [, forceRender] = useReducer((x) => x + 1, 0);

  // 상태 업데이트 함수 반환
  return forceRender;
};

export default useForceRenderer;
