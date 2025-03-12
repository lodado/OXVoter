import { NextResponse } from "next/server";

import { EDGE_DI_REPOSITORY } from "@/DI/edge.server";

import { GetUserInfoUseCase } from "../core";

export const isValidUserId = async ({ userId }: { userId?: string }) => {
  const auth = await new GetUserInfoUseCase(new EDGE_DI_REPOSITORY.Auth()).execute();

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (!auth) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (auth.id !== userId) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
};
