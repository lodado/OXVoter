"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";

import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { useErrorBoundary } from "@/shared/hooks";

import { useSocketContext } from "./useSocketManager";

export const useSocketRegister = (onConnectSuccess?: () => void) => {
  const params = useParams();

  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const { socketController, setSocketConnected } = useSocketContext();
  const [isLoading, setLoading] = useState(true);
  const { setError } = useErrorBoundary();

  useLayoutEffect(() => {
    const registerSocket = async () => {
      setLoading(true);

      try {
        await socketController.registerSubscriber(onConnectSuccess);
        setSocketConnected(true);
      } catch (e) {
        // setError(new SocketConnectionError({}));
        // setSocketConnected(false);
      } finally {
        setLoading(false);
      }
    };

    registerSocket();

    return () => {
      if (!isLoading) {
        const isSocketDisconnected = socketController.unregisterSubscriber();

        if (isSocketDisconnected) {
          setSocketConnected(false);
        }
      }
    };
  }, [socketController]);

  return { isSocketTryingToConnect: isLoading };
};
