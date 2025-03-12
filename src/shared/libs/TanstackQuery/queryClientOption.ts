export const queryClientOption = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,

      // above 0 to avoid refetching immediately on the client
      staleTime: 20 * 1000,
    },
  },
};
