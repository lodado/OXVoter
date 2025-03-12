import React from "react";

import { LoginFormDialog } from "@/entities/Auth";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

const GlobalDialogContainer = () => {
  return (
    <>
      <LoginFormDialog />
      <LoadingSpinner />
    </>
  );
};

export default GlobalDialogContainer;
