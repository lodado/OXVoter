import { useContext, useEffect } from "react";

import { SocketPubSubContext } from "../ui/SocketSettingProvider";

export type Payload = {
  id: string;
  data: any;
};

// Hook을 통해 Context를 쉽게 사용합니다.
export const useSocketContext = () => {
  const context = useContext(SocketPubSubContext);
  if (!context) {
    throw new Error("useSocketPubSub는 SocketPubSubProvider 내부에서만 사용해야 합니다.");
  }
  return context;
};

export const useSocketManager = (messageType: string, callback: (payload: Payload) => void) => {
  const { socketController } = useSocketContext();

  useEffect(() => {
    // 지정한 메시지 타입에 대해 구독
    const unsubscribe = socketController.subscribe(messageType, (payload) => {
      callback(payload);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribe();
    };
  }, [socketController, messageType]);

  // 지정한 메시지 타입의 메시지를 전송하는 함수
  const sendSocketMessage = (payload: any) => {
    socketController.send({ type: messageType, payload });
  };

  return { sendSocketMessage };
};
