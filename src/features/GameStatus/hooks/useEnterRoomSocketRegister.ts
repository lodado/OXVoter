"use client";
import { useCallback } from "react";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";
import { useCleanUp } from "@/shared/hooks";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { useGameStatusStore } from "../stores/useGameStatusStore";
import { useUserListStore } from "../stores/useUserListStore";

/**
 *
 *
 *
 this.client?.subscribe(`/sub/room/${roomId}/users`, (message: IMessage) => {
            console.log(JSON.parse(message.body), "123214214");
          });

          this.client?.subscribe(`/sub/room/${roomId}/enter`, (message: IMessage) => {
            console.log(JSON.parse(message.body));
          });

          this.client!.subscribe("/sub/chat/room/e76033eb-49ba-4917-9c6b-e8080f6933a7", (message: IMessage) => {
            // console.log(receiveData);
          });

          this.client?.publish({
            destination: `/pub/room/${roomId}/join`,
            body: JSON.stringify({
              roomId: roomId,
              sender: userName,
              message: [],
            }),
          });
 */

export const useEnterRoomSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setUserList, clearUserList } = useUserListStore();
  const { addToast } = useToastStore();
  const { setUserInformation, setRoomInformation } = useGameStatusStore();

  const initRoomSub = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/users`,
    callback: (payload) => {
      const GameStatusMessage = JSON.parse(payload.body);

      const message = GameStatusMessage.message?.[0];

      /**
       *
       * {
    "roomId": "25d172a8-cefb-49db-a9db-f0ce2187af33",
    "sender": "d8f5fcb4-d0ff-4a0a-9c2e-9c01990a6c64",
    "message": [
        {
            "roomId": "25d172a8-cefb-49db-a9db-f0ce2187af33",
            "roomState": "WAIT",
            "roomName": "wqewqe",
            "users": [
                {
                    "userId": "d8f5fcb4-d0ff-4a0a-9c2e-9c01990a6c64",
                    "userName": "wqeqwewq",
                    "isHost": true,
                    "state": "WAIT"
                }
            ],
            "optionMap": {
                "no": 0,
                "yes": 0,
                "abstain": 0
            }
        }
    ]
}
       *
       */
      const user = message?.users.find((user: any) => user.userName === userName);

      const roomId = message?.roomId;
      const roomState = message?.roomState;
      const roomName = message?.roomName;

      setUserList(message?.users);
      setUserInformation(user);
      setRoomInformation({
        roomId: roomId,
        roomName: roomName,
        roomState: roomState,
      });

      console.log(user, message, "message");
    },
  });

  const enterSub = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/enter`,
    callback: (payload) => {
      const toastMessage = JSON.parse(payload.body);
      const message = toastMessage.message?.[0].text;

      addToast({
        title: "New Player!",
        description: `${message} has been joined`,
        type: "success",
      });
    },
  });

  const { sendSocketMessage: sendJoinRoomMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/join`,
  });

  const handleJoinRoomMessage = () => {
    sendJoinRoomMessage({
      roomId: roomId,
      sender: userName,
      message: [],
    });
  };

  const subscriber = useCallback(() => {
    initRoomSub();
    enterSub();
  }, [enterSub, initRoomSub]);

  useCleanUp(() => {
    clearUserList();
  });

  return { subscriber, handleJoinRoomMessage };
};
