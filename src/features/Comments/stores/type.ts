export interface Comment {
  id: number;
  userId: string;
  boardId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentWithUserInformation extends Comment {
  email: string;
  name: string;
  image?: string;
}

export interface CommentsResponse {
  comments: CommentWithUserInformation[];
  nextCursor: number | null;
}
