export const getParsedQuery = ({ queryKey }: { queryKey: string | string[] }) => {
  const parsedQueryKey = typeof queryKey === "string" ? [queryKey] : queryKey;

  return parsedQueryKey;
};
