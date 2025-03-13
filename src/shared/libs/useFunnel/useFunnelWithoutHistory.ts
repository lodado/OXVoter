"use client";

import { createUseFunnel } from "@use-funnel/core";
import { useMemo, useState } from "react";

// Define the useFunnel hook using the createUseFunnel function.
export const useFunnelWithoutHistory = createUseFunnel(({ id, initialState }) => {
  // history manages the array of state snapshots for the funnel.
  const [history, setHistory] = useState(() => [initialState]);
  // currentIndex manages the index of the current funnel step.
  const [currentIndex, setCurrentIndex] = useState(0);

  return useMemo(
    () => ({
      // Returns the history and currentIndex, representing the current state of the funnel.
      history,
      currentIndex,
      // push function adds a new state and updates the current index.
      push(state) {
        setHistory((prev) => {
          const next = prev.slice(0, currentIndex + 1);
          return [...next, state];
        });
        setCurrentIndex((prev) => prev + 1);
      },
      // replace function replaces the current state and updates the state snapshot.
      replace(state) {
        setHistory((prev) => {
          const next = prev.slice(0, currentIndex);
          return [...next, state];
        });
      },
      // go function moves the current index by delta.
      go(delta) {
        setCurrentIndex((prev) => prev + delta);
      },
      // cleanup function is called when the funnel unmounts.
      cleanup() {},
    }),
    [history, currentIndex] // Returns memoized values whenever history and currentIndex change.
  );
});
