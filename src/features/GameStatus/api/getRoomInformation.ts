import { request } from "@/shared";

import { GameInformation } from "../constants";

 
const getRoomInformation = async ({ roomId }: { roomId: string }) => {
  const res = await request<GameInformation>({
    url: `/rooms/${roomId}`,
    method: "GET",
    params: {},
  });

  return res;
};

export default getRoomInformation;
