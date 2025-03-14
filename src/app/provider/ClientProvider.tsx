"use client";

import { PropsWithChildren } from "react";

import { NextAuthSessionResponse } from "@/entities/Auth/server/type";
import { SocketSettingProvider } from "@/entities/Socket/ui";
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
        <SocketSettingProvider>
          <ToastProvider>{children}</ToastProvider>
        </SocketSettingProvider>
        <RtlProvider />
      </ReactQueryProvider>
    </ReactDndProvider>
  );
};

export default ClientProvider;
