import { Reaction, ReactionResponse } from "../stores/type";

export const getOptimisticUpdateReactions =
  ({
    userReaction,
    liked,
    thumbsUp,
    bbangparay,
  }: {
    userReaction: Reaction;
    liked: boolean;
    thumbsUp: boolean;
    bbangparay: boolean;
  }) =>
  (oldData: ReactionResponse) => {
    let likeCount = oldData.likeCount;
    let thumbsUpCount = oldData.thumbsUpCount;
    let bbangparayCount = oldData.bbangparayCount;

    if (userReaction.liked !== liked) {
      likeCount = oldData.likeCount + (liked ? 1 : -1);
    }
    if (userReaction.thumbsUp !== thumbsUp) {
      thumbsUpCount = oldData.thumbsUpCount + (thumbsUp ? 1 : -1);
    }
    if (userReaction.bbangparay !== bbangparay) {
      bbangparayCount = oldData.bbangparayCount + (bbangparay ? 1 : -1);
    }

    return {
      ...oldData,
      likeCount,
      thumbsUpCount,
      bbangparayCount,
      userReaction: {
        ...oldData.userReaction!,
        liked,
        thumbsUp,
        bbangparay,
      },
    };
  };
