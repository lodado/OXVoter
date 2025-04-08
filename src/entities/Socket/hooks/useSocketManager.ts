"use client";

import { IMessage } from "@stomp/stompjs";
import { useCallback, useContext, useEffect } from "react";

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

export const useSocketSubScriber = ({
  messageType,
  callback,
}: {
  messageType: string;
  callback: (payload: IMessage) => void;
}) => {
  const { socketController, isSocketConnected } = useSocketContext();

  const subscribeFunction = useCallback(() => {
    return socketController.subscribe(messageType, (payload) => {
      callback?.(payload);
    });
  }, [socketController, messageType])

  return subscribeFunction
};

export const useSocketPublisher = ({ messageType }: { messageType: string }) => {
  const { isSocketConnected, socketController } = useSocketContext();

  // 지정한 메시지 타입의 메시지를 전송하는 함수
  const sendSocketMessage = (payload: { [key in string]: any }) => {
    if (isSocketConnected) socketController.publish(messageType, { ...payload });
  };

  return { sendSocketMessage };
};
