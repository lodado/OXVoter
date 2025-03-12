"use client";

import React from "react";

import BbangparayEmoticon from "/public/emoticon/BbangparayEmoticon.svg";
import LoveEmoticon from "/public/emoticon/LoveEmoticon.svg";
import ThumbsUpEmoticon from "/public/emoticon/ThumbsUpEmoticon.svg";
import { useAuthStore } from "@/entities/Auth/client/models/store/AuthStore";
import { useMutationWithNotification } from "@/shared/hooks";
import { BadgeButton, useQueryContainer } from "@/shared/ui";

import { fetchReaction, postReaction } from "../api/fetchReactions";
import { getParsedReactionKey } from "../utils/constant";
import { getOptimisticUpdateReactions } from "../utils/getOptimisticUpdateReactions";
import CopyLinkButton from "./CopyLinkButton";

const ReactionList = ({ userId, boardId }: { userId: string; boardId: string }) => {
  const { isLogin } = useAuthStore();

  const auth = isLogin
    ? {
        canUpdateReaction: true,
      }
    : {
        canUpdateReaction: false,
      };

  const {
    query: { data },
    handleOptimisticUpdate: handleOptimisticReactionUpdate,
    revertOptimisticUpdate: revertOptimisticReactionUpdate,
  } = useQueryContainer({
    queryKey: getParsedReactionKey({ boardId, userId }),
    queryFn: () => fetchReaction({ boardId, userId }),
    queryOptions: {},
  });

  const userReaction = data!.userReaction!;

  const { mutate } = useMutationWithNotification({
    mutationFn: async ({ liked, thumbsUp, bbangparay }: { liked: boolean; thumbsUp: boolean; bbangparay: boolean }) => {
      handleOptimisticReactionUpdate(getOptimisticUpdateReactions({ userReaction, liked, thumbsUp, bbangparay }));

      return postReaction({ boardId, userId, liked, thumbsUp, bbangparay });
    },
    onSuccess: async () => {},
    onError: async () => {
      revertOptimisticReactionUpdate();
    },
  });

  return (
    <div className="px-4 flex flex-row w-full h-12 gap-1 items-center">
      <CopyLinkButton />

      <BadgeButton
        type="button"
        variant={userReaction.thumbsUp ? "isSelected" : "line"}
        onClick={() => {
          mutate({ ...userReaction, thumbsUp: !userReaction.thumbsUp });
        }}
        disabled={!auth.canUpdateReaction}
      >
        <ThumbsUpEmoticon /> {data?.thumbsUpCount}
      </BadgeButton>

      <BadgeButton
        type="button"
        variant={userReaction.liked ? "isSelected" : "line"}
        onClick={() => {
          mutate({ ...userReaction, liked: !userReaction.liked });
        }}
        disabled={!auth.canUpdateReaction}
      >
        <LoveEmoticon /> {data?.likeCount}
      </BadgeButton>

      <BadgeButton
        type="button"
        variant={userReaction.bbangparay ? "isSelected" : "line"}
        onClick={() => {
          mutate({ ...userReaction, bbangparay: !userReaction.bbangparay });
        }}
        disabled={!auth.canUpdateReaction}
      >
        <BbangparayEmoticon /> {data?.bbangparayCount}
      </BadgeButton>
    </div>
  );
};

export default ReactionList;
