"use client";

import { useParams, useSearchParams } from "next/navigation";

import { useGameStatusStore } from "../stores";

export const useGameInformation = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const { userInformation } = useGameStatusStore();

  return { id: params.id as string, username, userId: userInformation.userId, isHost: userInformation.isHost };
};
