export const getParsedReactionKey = ({ boardId, userId }: { boardId: string; userId: string }) => {
  return ["emotion", boardId, userId];
};
