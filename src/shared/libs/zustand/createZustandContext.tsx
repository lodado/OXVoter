"use client";

import { type Context, createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, type UseBoundStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

/** zustand를 Provider와 연계하기 위해 사용하는 util 함수 */
export function createZustandContext<TStore extends object>(
  createStore: (initialState?: Partial<TStore>) => UseBoundStore<StoreApi<TStore>>
) {
  const StoreContext: Context<UseBoundStore<StoreApi<TStore>> | null> = createContext<UseBoundStore<
    StoreApi<TStore>
  > | null>(null);

  const Provider = ({ children, initialState }: { children: ReactNode; initialState?: Partial<TStore> }) => {
    const storeRef = useRef<UseBoundStore<StoreApi<TStore>>>();
    if (!storeRef.current) {
      storeRef.current = createStore(initialState);
    }

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
  };

  const useStoreFromContext = <U,>(selector: (state: TStore) => U): U => {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Zustand store is missing the Provider");
    return useStore(store, useShallow(selector));
  };

  return {
    Provider,
    useStore: useStoreFromContext,
  };
}
