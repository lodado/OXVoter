// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server";

import { EDGE_DI_REPOSITORY } from "@/DI/edge.server";
import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { isValidUserId } from "@/entities/index.server";
import { supabaseInstance } from "@/shared/index.server";
import setCircuitBreaker from "@/shared/libs/Redis/setCircuitBreaker";

import { Comment } from "../stores/type";

const PAGE_SIZE = 100;

// GET: 페이지네이션을 통한 댓글 목록 조회
export async function GET(request: NextRequest) {
  // 쿼리 파라미터 'cursor'를 offset으로 사용 (기본값 0)
  const cursorParam = request.nextUrl.searchParams.get("cursor") ?? "0";
  const boardId = request.nextUrl.searchParams.get("boardId") ?? "0";
  const cursor = parseInt(cursorParam, 10);

  // Supabase의 .range() 메서드는 [start, end] 인덱스를 지정합니다.
  const start = cursor;
  const end = cursor + PAGE_SIZE - 1;

  const {
    data: comments,
    error,
    count,
  } = await supabaseInstance
    .from("simminnycomments_with_user")
    .select(`*`, { count: "exact" })
    .order("createdAt", { ascending: false })
    .eq("boardId", boardId)
    .range(start, end);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 다음 페이지가 있는 경우 다음 커서(offset) 계산
  let nextCursor: number | null = null;
  if (count !== null && cursor + PAGE_SIZE < count) {
    nextCursor = cursor + PAGE_SIZE;
  }

  return NextResponse.json({ comments, nextCursor });
}

// POST: 새 댓글 추가
export async function POST(request: NextRequest) {
  try {
    const body: Comment = await request.json();
    const { content, userId, boardId } = body;

    const { error: circuitBreakerError, message } = await setCircuitBreaker(`commentsApiUser${userId}`, 35, 10 * 60);

    if (circuitBreakerError) {
      return NextResponse.json({ error: message }, { status: 429 });
    }

    const authErrorResponse = await isValidUserId({ userId: userId! });
    if (authErrorResponse) return authErrorResponse;

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // 새로운 댓글을 데이터베이스에 추가
    // userId, boardId 등 다른 컬럼은 필요에 따라 추가할 수 있습니다.
    const { data, error } = await supabaseInstance
      .from("simminyComments")
      .insert([{ userId, boardId, content }])
      // 새로 생성된 행의 데이터를 받아오기 위해 select 사용
      .select("id, boardId, content, createdAt")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: 댓글 업데이트 by id
export async function PUT_BY_ID(request: NextRequest,  { params }: { params: { id: string } }) {
  const { id } = params; 

  try {
    const body: Comment = await request.json();
    const { content } = body;
 
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
 
    const { data, error } = await supabaseInstance
      .from("simminyComments")
      .update({ content })
      .eq('id', id)
      // 새로 생성된 행의 데이터를 받아오기 위해 select 사용
      .select("id, boardId, content, createdAt")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: 댓글 업데이트 by id
export async function DELETE_BY_ID(request: NextRequest,  { params }: { params: { id: string } }) {


  try {
    const { id } = params;
   
    const { data, error } = await supabaseInstance
      .from("simminyComments")
      .delete()
      .eq('id', id)
 
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
 

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
