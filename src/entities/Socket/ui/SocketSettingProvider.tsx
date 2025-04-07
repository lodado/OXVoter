"use client";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

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
