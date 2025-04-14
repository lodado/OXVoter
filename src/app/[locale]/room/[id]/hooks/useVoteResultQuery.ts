import React from "react";

import { useQueryContainer } from "@/shared/ui";

import getVoteResult from "../api/getVoteResult";

const useVoteResultQuery = ({ roomId }: { roomId: string }) => {
  const result = useQueryContainer({
    queryKey: ["voteResult", roomId],
    queryFn: async () => {
      return await getVoteResult({ roomId });
    },

    queryOptions: {
      gcTime: 0,
      staleTime: 0,
    },
  });

  return result;
};

export default useVoteResultQuery;
