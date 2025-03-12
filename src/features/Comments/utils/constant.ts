export const getParsedBoardKey = ({ boardId, userId }: { boardId: string; userId: string }) => {
  return ["board", boardId, userId];
};
