import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  const body = await request.json();
  const { tagName } = body;

  const tagNameArray = Array.isArray(tagName) ? tagName : [tagName];

  tagNameArray.forEach((tag) => {
    revalidateTag(tag);
  });
  return NextResponse.json({ revalidated: true });
}
