import { request } from "@/shared";

export async function postRevalidateTag({ tagName }: { tagName: string | string[] }): Promise<void> {
  return await request({
    url: `/api/revalidate`,
    method: "POST",
    body: JSON.stringify({ tagName }),
    isClientServer: true,
  });
}
