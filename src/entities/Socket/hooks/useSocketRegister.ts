"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";

import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { useErrorBoundary } from "@/shared/hooks";

import { useSocketContext } from "./useSocketManager";

export const useSocketRegister = () => {
  const params = useParams();

  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const { socketController } = useSocketContext();
  const [isLoading, setLoading] = useState(true);
  const { setError } = useErrorBoundary();

  useLayoutEffect(() => {
    const registerSocket = async () => {
      setLoading(true);

      try {
        await socketController.registerSubscriber(params.id as string, username);
      } catch (e) {
        setError(new SocketConnectionError({}));
      } finally {
        setLoading(false);
      }
    };

    registerSocket();

    return () => {
      if (!isLoading) socketController.unregisterSubscriber();
    };
  }, [socketController]);

  console.log(params);

  const registerUser = () => {};

  return { isSocketTryingToConnect: isLoading };
};
