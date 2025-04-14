import { request } from "@/shared";

type VoteResult = {
  result: { [key in string]: number };
};

const getVoteResult = async ({ roomId }: { roomId: string }) => {
  const res = await request<VoteResult>({
    url: `/rooms/${roomId}/vote`,
    method: "GET",
    params: {},
  });

  return res;
};

export default getVoteResult;
