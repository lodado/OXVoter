"use client";

// SwipeContext.tsx
import React, { createContext, useContext, useState } from "react";

interface SwipeContextType {
  swipedItemId: string | null;
  setSwipedItemId: (id: string | null) => void;
}

const SwipeContext = createContext<SwipeContextType>({
  swipedItemId: null,
  setSwipedItemId: () => {},
});

export const useSwipeContext = () => useContext(SwipeContext);

export const SwipeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);

  return <SwipeContext.Provider value={{ swipedItemId, setSwipedItemId }}>{children}</SwipeContext.Provider>;
};
