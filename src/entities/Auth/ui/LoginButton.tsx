"use client";

import React from "react";

import { useAuthStore } from "@/entities/Auth/client/models/store/AuthStore";
import { Button } from "@/shared/ui";

const LoginButton = () => {
  const { isLogin, setLoginFormDialogVisible } = useAuthStore();

  const handleLoginButtonClick = () => {
    if (!isLogin) setLoginFormDialogVisible(true);
  };

  return (
    <div className="w-full flex items-center max-w-[29rem]">
      <Button className="w-full" variant="primaryLine" onClick={handleLoginButtonClick}>
        로그인하기
      </Button>
    </div>
  );
};

export default LoginButton;
