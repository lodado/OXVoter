"use client";

import React, { createContext, ReactNode, useContext, useRef } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

/**
 * createZustandContext
 *
 * React Context와 연계된 zustand 스토어를 생성하는 유틸 함수입니다.
 * 스코프 개념 없이, 하나의 컨텍스트에서 상태를 공유합니다.
 */
export function createZustandContext<TStore extends object>(
  createStore: (initialState?: Partial<TStore>) => UseBoundStore<StoreApi<TStore>>
) {
  // 단일 컨텍스트 생성
  const Context = createContext<UseBoundStore<StoreApi<TStore>> | null>(null);
  // 기본 스토어 참조 (초기 Provider 생성 시 저장)
  let defaultStore: UseBoundStore<StoreApi<TStore>> | undefined;

  /**
   * Provider 컴포넌트
   * initialState를 받아 zustand 스토어를 생성하고 Context에 제공합니다.
   */
  const Provider = ({ children, initialState }: { children: ReactNode; initialState?: Partial<TStore> }) => {
    const storeRef = useRef<UseBoundStore<StoreApi<TStore>>>();
    if (!storeRef.current) {
      storeRef.current = createStore(initialState);
      // 첫 번째 Provider일 경우 defaultStore에 저장
      if (!defaultStore) {
        defaultStore = storeRef.current;
      }
    }
    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>;
  };

  /**
   * useStore 훅
   * Context로부터 zustand 스토어를 받아 selector와 함께 사용합니다.
   */
  const useStoreFromContext = <U,>(selector: (state: TStore) => U): U => {
    const store = useContext(Context);

    console.log("useStoreFromContext", store, Context);

    if (!store) {
      throw new Error("Zustand store is missing the Provider");
    }
    return useStore(store, useShallow(selector));
  };

  return {
    Provider,
    useStore: useStoreFromContext,
  };
}
