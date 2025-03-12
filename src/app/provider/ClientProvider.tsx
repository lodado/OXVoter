"use client";

import { PropsWithChildren } from "react";

import { NextAuthSessionResponse } from "@/entities/Auth/server/type";
import { ReactDndProvider, ReactQueryProvider, RtlProvider, ThemeProvider } from "@/shared";
import ToastProvider from "@/shared/ui/Toast/ui/ToastProvider";

const ClientProvider = ({
  children,
  session,
}: PropsWithChildren & {
  session: NextAuthSessionResponse | undefined;
}) => {
  return (
    <ReactDndProvider>
      <ReactQueryProvider>
        <ToastProvider>{children}</ToastProvider>

        <RtlProvider />
      </ReactQueryProvider>
    </ReactDndProvider>
  );
};

export default ClientProvider;
