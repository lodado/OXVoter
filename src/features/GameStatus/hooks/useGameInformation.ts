"use client";

import { useParams, useSearchParams } from "next/navigation";

export const useGameInformation = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  return { id: params.id as string, username };
};
