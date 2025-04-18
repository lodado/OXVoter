import { redirect } from "next/navigation";
import React from "react";

import getRoomInformation from "@/features/GameStatus/api/getRoomInformation";

import RoomPage from "./components/Room";

const page = async (props: { searchParams: { username?: string }; params: { id: string } }) => {
  const { searchParams, params } = props;

  // const gameInformation = await getRoomInformation({ roomId: params.id as string });

  return (
    <>
      <RoomPage {...props} />
    </>
  );
};

export default page;
