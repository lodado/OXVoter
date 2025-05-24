"use client";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { SocketPubSubManager } from "../utils/SocketPubSubManager";

interface SocketPubSubContextProps {
  socketController: SocketPubSubManager;
  isSocketConnected: boolean;
  setSocketConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SocketPubSubContext = createContext<SocketPubSubContextProps | undefined>(undefined);

const SocketSettingProvider = ({ children }: PropsWithChildren) => {
  // 컴포넌트가 마운트될 때 한 번 SocketPubSubManager 인스턴스를 생성합니다.
  const [socketController] = useState(() => new SocketPubSubManager(process.env.NEXT_PUBLIC_SOCKET_URL!));
  const [isSocketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const tryReconnect = () => {
      if (socketController.canReconnect()) {
        (async () => {
          try {
            await socketController.connect();
            if (isMounted) setSocketConnected(true);
          } catch {
            if (isMounted) setSocketConnected(false);
          }
        })();
      }
    };

    // 1) 탭 포커스 복귀
    window.addEventListener("focus", tryReconnect);
    // 2) 화면 잠김/해제, 백그라운드 ↔ 포그라운드
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        tryReconnect();
      }
    });
    // 3) bfcache 복원
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        tryReconnect();
      }
    });

    return () => {
      isMounted = false;
      // 이벤트 리스너 해제
      window.removeEventListener("focus", tryReconnect);
      window.removeEventListener("visibilitychange", tryReconnect);
      window.removeEventListener("pageshow", tryReconnect as any);
    };
  }, [socketController]);

  return (
    <SocketPubSubContext.Provider
      value={{
        socketController: socketController,
        isSocketConnected: isSocketConnected,
        setSocketConnected: setSocketConnected,
      }}
    >
      {children}
    </SocketPubSubContext.Provider>
  );
};

export default SocketSettingProvider;
