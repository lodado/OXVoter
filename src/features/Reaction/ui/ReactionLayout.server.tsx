import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

import { getQueryClient } from "@/shared";

import { fetchReaction } from "../api/fetchReactions";
import { getParsedReactionKey } from "../utils/constant";
import ReactionList from "./ReactionList";
import { ReactionProps } from "./type";

const ReactionLayout = async ({ userId, boardId }: ReactionProps) => {
  const queryClient = getQueryClient();
  await queryClient.fetchQuery({
    queryKey: getParsedReactionKey({ boardId, userId }),
    queryFn: ({}) => fetchReaction({ boardId, userId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full ">
        <ReactionList userId={userId} boardId={boardId} />
      </div>
    </HydrationBoundary>
  );
};

export default ReactionLayout;
