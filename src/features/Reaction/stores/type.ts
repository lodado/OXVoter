export interface Reaction {
  id: number;
  userId: string;
  boardId: string;

  liked: boolean;
  thumbsUp: boolean;
  bbangparay: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface ReactionResponse {
  likeCount: number;
  thumbsUpCount: number;
  bbangparayCount: number;
  userReaction: Reaction | null;
}
