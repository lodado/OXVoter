import React from "react";

import getRoomInformation from "@/features/GameStatus/api/getRoomInformation";
import { GameSettingProvider } from "@/features/GameStatus/stores/useGameSettingStore";

import RoomPage from "./components/Room";

const page = async (props: { searchParams: { username?: string }; params: { id: string } }) => {
  const { searchParams, params } = props;

  const gameInformation = await getRoomInformation({ roomId: params.id as string });

  return (
    <GameSettingProvider initialState={{ maxPlayerCount: gameInformation.maxPlayerCount }}>
      <RoomPage {...props} gameInformation={gameInformation} />
    </GameSettingProvider>
  );
};

export default page;
