"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";

import { useAuthStore } from "../../client/models/store/AuthStore";
import { NextAuthSessionResponse } from "../../server/type";

const LoginSessionProvider = ({ children, session }: { children: ReactNode; session?: NextAuthSessionResponse }) => {
  const [sessionRefetchInterval, setSessionRefetchInterval] = useState(10000);
  const { session: userLoginSession, setSession, clearSession } = useAuthStore();

  useEffect(() => {
    if (session) setSession(session);

    if (userLoginSession) {
      if (session == undefined || session?.error) {
        clearSession();

        return;
      }

      if (session) {
        const nowTime = Math.round(Date.now() / 1000);
        const timeRemaining = (session.expiresAt as number) - 5 * 60 - nowTime;

        setSessionRefetchInterval(timeRemaining > 0 ? timeRemaining : 0);
      }
    }
  }, [session, setSessionRefetchInterval]);

  return (
    <NextAuthSessionProvider refetchInterval={sessionRefetchInterval} session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};

export default LoginSessionProvider;
