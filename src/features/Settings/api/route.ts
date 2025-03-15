import { NextRequest, NextResponse } from "next/server";

import { supabaseInstance } from "@/shared/index.server";
import setCircuitBreaker from "@/shared/libs/Redis/setCircuitBreaker";

export const POSTuserFeedback = async (request: NextRequest) => {
  const body = await request.json();
  const { userName, email, message } = body;

  const { error: circuitBreakerError, message: circuitMessage } = await setCircuitBreaker(`userFeedback`, 35, 10 * 60);

  if (circuitBreakerError) {
    return NextResponse.json({ error: circuitMessage }, { status: 429 });
  }

  // 새로운 댓글을 데이터베이스에 추가
  // userId, boardId 등 다른 컬럼은 필요에 따라 추가할 수 있습니다.
  const { data, error } = await supabaseInstance
    .from("userFeedback")
    .insert([{ name: userName, email: email, message: message }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
};
