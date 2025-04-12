"use client";

import { AlertCircle, Crown, UserCircle2 } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/ui";

import { Player } from "./type";

const GamePlayerList = ({ players }: { players: Player[] }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {players.map((player) => (
        <div
          key={player.userId}
          className={`flex items-center rounded-lg p-3 ${
            player.isAlive ? "bg-slate-700/50" : "bg-red-900/20 text-slate-400 line-through"
          }`}
        >
          <UserCircle2 className="mr-2 h-5 w-5 text-slate-300" />
          <span className="flex-1">{player.userName}</span>

          <div className="flex flex-row items-center gap-2">
            {player.isHost && <Crown className="h-4 w-4 text-amber-400" />}
            {player.role && (
              <Badge variant="primary" className="px-2 subhead-2">
                {player.role}
              </Badge>
            )}
            {!player.isAlive && <AlertCircle className="h-4 w-4 text-red-400" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamePlayerList;
