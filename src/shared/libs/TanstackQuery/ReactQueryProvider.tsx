import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cache } from "react";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from "react";

import { queryClientOption } from "./queryClientOption";

export function makeQueryClient() {
  return new QueryClient(queryClientOption as any);
}

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
