"use client";

import { AlertCircle, Crown, UserCircle2 } from "lucide-react";
import React from "react";

import { useUserListStore } from "@/features";
import { Badge } from "@/shared/ui";

import { Player } from "./type";

const GamePlayerList = () => {
  const { userList } = useUserListStore();

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {userList.map((user) => (
        <div
          key={user.userId}
          className={`flex items-center rounded-lg p-3 ${
            "bg-slate-700/50"
            // user.isAlive ? "bg-slate-700/50" : "bg-red-900/20 text-slate-400 line-through"
          }`}
        >
          <UserCircle2 className="mr-2 h-5 w-5 text-slate-300" />
          <span className="flex-1">{user.userName}</span>

          <div className="flex flex-row items-center gap-2">
            {user.isHost && <Crown className="h-4 w-4 text-amber-400" />}

            {/*
            {user.role && (
              <Badge variant="primary" className="px-2 subhead-2">
                {user.role}
              </Badge>
            )}
            */}
            {/* !user.isAlive && <AlertCircle className="h-4 w-4 text-red-400" /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamePlayerList;
