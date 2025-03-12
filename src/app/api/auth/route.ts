import { NextRequest, NextResponse } from "next/server";

import { EDGE_DI_REPOSITORY } from "@/DI/edge.server";
import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { supabaseInstance } from "@/shared/index.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const DELETE = async (request: NextRequest) => {
  try {
    const user = await new GetUserInfoUseCase(new EDGE_DI_REPOSITORY.Auth()).execute();
    const id = user?.id;

    if (!id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { error } = await supabaseInstance.schema("next_auth").from("users").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err: any) {
    console.log("remove user error", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
