import { request } from "@/shared";

import { ReactionResponse } from "../stores/type";

export async function fetchReaction({
  boardId,
  userId,
}: {
  boardId: string | number;
  userId: string;
}): Promise<ReactionResponse> {
  const res = await request<ReactionResponse>({
    url: `/api/reactions/${boardId}`,
    method: "GET",
    params: {
      userId,
    },
  });

  return res;
}

export async function postReaction({
  boardId,
  userId,
  liked,
  thumbsUp,
  bbangparay,
}: {
  boardId: string;
  userId: string;
  liked: boolean;
  thumbsUp: boolean;
  bbangparay: boolean;
}): Promise<void> {
  return await request({
    url: `/api/reactions/${boardId}`,
    method: "POST",
    body: JSON.stringify({ userId, liked, thumbsUp, bbangparay }),
  });
}
