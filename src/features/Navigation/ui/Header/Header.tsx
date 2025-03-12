import React, { PropsWithChildren } from "react";

import { cn } from "@/shared";

const Header = ({ className, children }: PropsWithChildren & { className: string }) => {
  return <header className={cn("header-content", className)}>{children}</header>;
};

export default Header;
