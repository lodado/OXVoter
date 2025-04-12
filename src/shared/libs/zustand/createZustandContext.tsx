// createZustandContextWithScope.ts
"use client";

import React, { createContext, ReactNode, useContext, useRef } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

/**
 * createZustandContextWithScope
 *
 * zustand 스토어를 context Provider와 연계하는 유틸 함수에 스코프 개념을 추가한 버전입니다.
 * Provider와 hook 모두 선택적으로 scope 값을 받을 수 있으며, 동일한 scope를 사용한 컴포넌트끼리 별도의 상태를 공유합니다.
 */
export function createZustandContextWithScope<TStore extends object>(
  createStore: (initialState?: Partial<TStore>) => UseBoundStore<StoreApi<TStore>>
) {
  // scope 값을 key로 하는 React Context들을 저장할 WeakMap (key는 객체여야 함)
  const contexts = new WeakMap<object, React.Context<UseBoundStore<StoreApi<TStore>> | null>>();
  // scope가 없는 경우에 사용될 기본 컨텍스트
  let defaultContext: React.Context<UseBoundStore<StoreApi<TStore>> | null> | undefined;

  // scope 값(객체)이 있으면 해당 scope의 컨텍스트, 없으면 기본 컨텍스트를 반환
  function getContext(scope?: object) {
    if (!scope) {
      if (!defaultContext) {
        defaultContext = createContext<UseBoundStore<StoreApi<TStore>> | null>(null);
      }
      return defaultContext;
    } else {
      if (!contexts.has(scope)) {
        contexts.set(scope, createContext<UseBoundStore<StoreApi<TStore>> | null>(null));
      }

      return contexts.get(scope)!;
    }
  }

  // Provider는 선택적 scope prop(객체)을 받고, 해당 scope에 맞는 컨텍스트 Provider로 감쌉니다.
  const Provider = ({
    children,
    initialState,
    scope,
  }: {
    children: ReactNode;
    initialState?: Partial<TStore>;
    scope?: object;
  }) => {
    const ContextToUse = getContext(scope);
    const storeRef = useRef<UseBoundStore<StoreApi<TStore>>>();
    if (!storeRef.current) {
      storeRef.current = createStore(initialState);
    }
    return <ContextToUse.Provider value={storeRef.current}>{children}</ContextToUse.Provider>;
  };

  // hook도 선택적으로 scope 값을 받고, 동일한 scope에 대응하는 컨텍스트에서 zustand 스토어를 읽어옵니다.
  const useStoreFromContext = <U,>(selector: (state: TStore) => U, scope?: object): U => {
    const ContextToUse = getContext(scope);
    const store = useContext(ContextToUse);
    if (!store) throw new Error(`Zustand store is missing the Provider; required scope: ${scope}`);
    return useStore(store, useShallow(selector));
  };

  return {
    Provider,
    useStore: useStoreFromContext,
  };
}
