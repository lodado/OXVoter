import { redirect } from "next/navigation";
import React from "react";

import { PAGE_ROUTE } from "@/entities/Router/configs/route";
import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { ErrorBoundary } from "@/shared/ui";
import { FallbackMapping } from "@/shared/ui/ErrorBoundary/ui/ErrorBoundary";

import RoomPage from "./components/Room";

const page = async (props: { searchParams: { username?: string }; params: { id: string } }) => {
  const { searchParams, params } = props;

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
