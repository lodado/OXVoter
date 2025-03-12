import { NextResponse } from "next/server";

import { isValidUserId } from "@/entities/index.server";
import { supabaseInstance } from "@/shared/index.server";

/**
 * GET: 특정 boardId에 대한 각 반응의 총 개수와 특정 userId의 반응 여부를 반환합니다.
 * 예) GET /api/reactions?boardId=1&userId=user1
 */
export async function GET(request: Request, { params }: { params: { boardId: string } }) {
  const { pathname, searchParams } = new URL(request.url);
  const { boardId } = params;
  const userId = searchParams.get("userId");

  if (!boardId) {
    return NextResponse.json({ error: "boardId and userId are required" }, { status: 400 });
  }

  // 각 반응에 대한 총 개수 조회
  const { data: countData, error: countError } = await supabaseInstance
    .from("simminyUserReactions")
    .select("liked,thumbsUp, bbangparay, userId")
    .eq("boardId", boardId);

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  const likeCount = countData.filter((reaction) => reaction.liked).length;
  const thumbsUpCount = countData.filter((reaction) => reaction.thumbsUp).length;
  const bbangparayCount = countData.filter((reaction) => reaction.bbangparay).length;

  const userReaction = countData.find((reaction) => reaction.userId === userId) ?? {
    liked: false,
    thumbsUp: false,
    bbangparay: false,
  };

  return NextResponse.json({
    likeCount,
    thumbsUpCount,
    bbangparayCount,
    userReaction,
  });
}

/**
 * GET: 특정 userId가 생성한 모든 게시판 목록을 가져오고 각 게시판의 반응 수를 집계합니다.
 * 각 게시판에 대해 다른 유저들의 반응을 합산하고 현재 userId의 반응 상태를 확인합니다.
 * 예) GET /api/reactions?userId=user1
 */
export async function GET_ALL(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // userId가 생성한 모든 게시판 목록 가져오기
  const { data: userBoards, error: userBoardsError } = await supabaseInstance
    .from("boards") // 게시판 테이블에서 가져옴 (테이블 명은 필요 시 수정)
    .select("boardId")
    .eq("userId", userId);

  if (userBoardsError) {
    return NextResponse.json({ error: userBoardsError.message }, { status: 500 });
  }

  const boardIds = userBoards.map((board) => board.boardId);

  // 각 게시판에 대한 모든 유저의 반응 가져오기
  const { data: reactionsData, error: reactionsError } = await supabaseInstance
    .from("simminyUserReactions")
    .select("boardId, liked, thumbsUp, bbangparay, userId")
    .in("boardId", boardIds);

  if (reactionsError) {
    return NextResponse.json({ error: reactionsError.message }, { status: 500 });
  }

  // 각 게시판별로 반응 수를 집계하고, 해당 유저의 반응 상태 확인
  const boardCounts = reactionsData.reduce(
    (acc, reaction) => {
      const boardId = reaction.boardId;

      if (!acc[boardId]) {
        acc[boardId] = {
          boardId,
          likeCount: 0,
          thumbsUpCount: 0,
          bbangparayCount: 0,
          userLiked: false,
          userThumbsUp: false,
          userBbangparay: false,
        };
      }

      // 반응 수 집계
      if (reaction.liked) acc[boardId].likeCount++;
      if (reaction.thumbsUp) acc[boardId].thumbsUpCount++;
      if (reaction.bbangparay) acc[boardId].bbangparayCount++;

      // 현재 유저의 반응 상태 확인
      if (reaction.userId === userId) {
        acc[boardId].userLiked = reaction.liked;
        acc[boardId].userThumbsUp = reaction.thumbsUp;
        acc[boardId].userBbangparay = reaction.bbangparay;
      }

      return acc;
    },
    {} as Record<
      string,
      {
        boardId: number;
        likeCount: number;
        thumbsUpCount: number;
        bbangparayCount: number;
        userLiked: boolean;
        userThumbsUp: boolean;
        userBbangparay: boolean;
      }
    >
  );

  return NextResponse.json({ boards: Object.values(boardCounts) });
}

export async function POST(request: Request, { params }: { params: { boardId: string } }) {
  try {
    const { boardId } = params;

    const body = await request.json();
    const { userId, liked, thumbsUp, bbangparay } = body;

    if (!userId || !boardId) {
      return NextResponse.json({ error: "userId and boardId are required" }, { status: 400 });
    }

    const { data, error } = await supabaseInstance
      .from("simminyUserReactions")
      .upsert(
        {
          userId,
          boardId,
          liked,
          thumbsUp,
          bbangparay,
        },
        { onConflict: "userId, boardId" }
      )
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
