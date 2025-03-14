import { redirect } from "next/navigation";
import React from "react";

import { PAGE_ROUTE } from "@/entities/Router/configs/route";

import RoomPage from "./components/Room";

const page = async (props: { searchParams: { username?: string }; params: { id: string } }) => {
  const { searchParams, params } = props;

  console.log("searchParams", searchParams, searchParams.username);

  if (!searchParams.username) {
    redirect(`${PAGE_ROUTE.JOIN_ROOM}?roomName=${params.id}`);
  }

  return (
    <>
      <RoomPage {...props} />
    </>
  );
};

export default page;
