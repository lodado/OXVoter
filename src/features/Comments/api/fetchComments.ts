import { request } from "@/shared";

import { CommentsResponse } from "../stores/type";

/**
 * GET /api/comments?cursor=... 를 호출하여 페이지네이션 처리된 댓글 목록을 반환합니다.
 */
export async function fetchComments({
  boardId,
  pageParam,
}: {
  boardId: string;
  pageParam: number;
}): Promise<CommentsResponse> {
  const res = await request<CommentsResponse>({
    url: `/api/comments`,
    method: "GET",
    params: {
      cursor: pageParam,
      boardId,
    },
  });

  return res;
}

/**
 * POST /api/comments 를 호출하여 새 댓글을 등록합니다.
 */
export async function updateComments({
  userId,
  boardId,
  content,
}: {
  userId: string;
  boardId: string;
  content: string;
}): Promise<Comment> {
  const res = await request<Comment>({
    url: `/api/comments`,
    method: "POST",
    data: JSON.stringify({
      userId,
      boardId,
      content,
    }),
  });

  return res;
}
 
export async function removeCommentById({ id }: { id: string }): Promise<Comment> {
  const res = await request<Comment>({
    url: `/api/comments/${id}`,
    method: "DELETE",
    params: {},
  });

  return res;
}

export async function updateCommentById({ id, content }: { id: string; content: string }): Promise<Comment> {
  const res = await request<Comment>({
    url: `/api/comments/${id}`,
    method: "PUT",
    data: JSON.stringify({
      content,
    }),
  });

  return res;
}
