 
import { request } from '@/shared';
 
export const joinGameApi = async ({ userName, roomName} : {
  userName: string;
  roomName: string;
}) => {
  return await request<{
      roomId: string;
      userId: string;
      userName: string;
      isHost: boolean;
      state: string;
    }>({
      method: "GET",
      url: `/room/${roomName}/pre-check`,
      params: { userName: userName },
    });
};
