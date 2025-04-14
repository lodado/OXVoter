import { useTranslations } from "next-intl";
import React from "react";

import { useGameInformation } from "@/features";

const GameRoomHeader = () => {
  const tRoom = useTranslations("Room");
  const { roomName, id, username } = useGameInformation();

  return (
    <header className="mb-7 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{tRoom("roomName", { roomName: roomName })}</h1>
        <p className="text-sm text-slate-300">{tRoom("roomId", { id: id })}</p>
      </div>
      <div className="flex items-center gap-2 w-[50%] flex-row justify-end flex-wrap">
        {/* myRole && <div className="rounded-full bg-slate-700 px-3 py-1 text-sm">{tRoom("role", { role: myRole })}</div> */}
        <div className="rounded-full bg-blue-600 px-3 py-1 text-sm">{tRoom("username", { username })}</div>
      </div>
    </header>
  );
};

export default GameRoomHeader;
