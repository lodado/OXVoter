"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRef } from "react";

import { getQueryClient } from "@/shared/libs";

import { getParsedQuery } from "../utils";

export function useQueryContainer<RESPONSE>({
  queryKey,
  queryFn,
  initialData,

  queryOptions,
}: {
  queryKey: string | string[];
  queryFn: () => Promise<RESPONSE>;
  initialData?: RESPONSE;

  queryOptions?: Omit<UseQueryOptions<RESPONSE, unknown, RESPONSE, any>, "queryKey" | "queryFn">;
}) {
  const queryClient = getQueryClient();
  const previousDataRef = useRef<RESPONSE | undefined>(undefined);

  const parsedQueryKey = getParsedQuery({ queryKey });

  const query = useQuery({
    retry: 1,
    queryFn: () => queryFn(),
    initialData,
    ...queryOptions,
    queryKey: parsedQueryKey,
  });

  const handleOptimisticUpdate = (updater: (currentData: RESPONSE) => RESPONSE) => {
    queryClient.setQueryData<RESPONSE>(parsedQueryKey, (oldData) => {
      previousDataRef.current = oldData;
      if (!oldData) return oldData;
      return updater(oldData);
    });
  };

  const revertOptimisticUpdate = () => {
    if (previousDataRef.current !== undefined) {
      queryClient.setQueryData<RESPONSE>(parsedQueryKey, previousDataRef.current);
    }
  };

  return { parsedQueryKey, query, handleOptimisticUpdate, revertOptimisticUpdate };
}
