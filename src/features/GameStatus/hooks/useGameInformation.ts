"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import getRoomInformation from "../api/getRoomInformation";
import { useGameStatusStore } from "../stores";

export const useGameInformation = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const { userInformation } = useGameStatusStore();

  /** TODO - SSR server에서 요청하도록 변경 */
  useEffect(() => {
    const requestApi = async () => {
      const request = await getRoomInformation({ roomId: params.id as string });

      console.log("req information", request);

      // setGameInformation(request);
    };

    requestApi();
  }, []);

  console.log(userInformation, "abcd");

  return { id: params.id as string, username, userId: userInformation.userId, isHost: userInformation.isHost };
};
