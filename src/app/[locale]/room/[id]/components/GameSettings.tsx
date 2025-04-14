"use client";

import { useParams } from "next/navigation";
import React, { PropsWithChildren, useLayoutEffect } from "react";

import { GameInformation, useGameInformation, useGameStatusStore, UserInformation, useUserListStore } from "@/features";

const GameSettings = ({ gameInformation }: { gameInformation: GameInformation }) => {
  const params = useParams();
  const { setGameStatus, setUserId, setRoomInformation, setUserInformation } = useGameStatusStore();
  const { setUserList } = useUserListStore();

  useLayoutEffect(() => {
    const user = gameInformation.users.find((user: any) => user.userName === params.username);

    const roomId = gameInformation?.roomId;
    const roomState = gameInformation?.roomState;
    const roomName = gameInformation?.roomName;

    // setUserList(gameInformation?.users);
    // if (user) setUserInformation(user);

    setRoomInformation({
      roomId: roomId,
      roomName: roomName,
      roomState: roomState,
    });
  }, []);

  return <> </>;
};

export default GameSettings;
