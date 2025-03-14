"use client";

import { useLayoutEffect, useState } from "react";

import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { useErrorBoundary } from "@/shared/hooks";

import { useSocketContext } from "./useSocketManager";

export const useSocketRegister = () => {
  const { socketController } = useSocketContext();
  const [isLoading, setLoading] = useState(true);
  const { setError } = useErrorBoundary();

  useLayoutEffect(() => {
    const registerSocket = async () => {
      setLoading(true);

      try {
        await socketController.registerSubscriber();
      } catch (e) {
        /** FIXME - 나중 소캣 연결 후 주석 해제 */
        // setError(new SocketConnectionError({}));
      } finally {
        setLoading(false);
      }
    };

    registerSocket();

    return () => {
      if (!isLoading) socketController.unregisterSubscriber();
    };
  }, [socketController]);

  return { isSocketTryingToConnect: isLoading };
};
