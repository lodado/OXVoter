import React, { PropsWithChildren } from "react";

import { NextAuthSessionResponse } from "../../server/type";
import LoginSessionProvider from "./LoginSessionProvider";

const AuthProvider = async ({
  children,
  session,
}: PropsWithChildren & {
  session: NextAuthSessionResponse | undefined;
}) => {
  return <LoginSessionProvider session={session}>{children}</LoginSessionProvider>;
};

export default AuthProvider;
