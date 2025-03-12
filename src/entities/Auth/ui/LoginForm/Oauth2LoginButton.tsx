"use client";

import { cva } from "class-variance-authority";
import React, { ReactNode, useState } from "react";

import { LocalStorageStrategy, StorageController, useI18n } from "@/shared";
import { useIsClient } from "@/shared/hooks";
import { Button, Tooltip } from "@/shared/ui";

import { LOGIN_METHOD } from "../../api/constant";

interface LoginButtonProps {
  value: "google" | "kakao" | "github";
  children: ReactNode;
}

const LoginButtonStyles = cva("flex gap-2 w-[3.75rem] h-[3.75rem] justify-center items-center p-4  rounded-full", {
  variants: {
    value: {
      kakao: "bg-[#FEE500] text-color-[#000]",
      google: `bg-[#F5F5F5] text-color-#000`,
      github: "bg-[#24292F] text-[#fff]",
    },
  },
  defaultVariants: {},
});

const userInfo = new StorageController<Record<string, LoginButtonProps["value"]>>(
  new LocalStorageStrategy("/login/userinfo")
);

const Oauth2LoginButton = ({ value, children }: LoginButtonProps) => {
  const isClient = useIsClient();
  const [{ value: lastLoginInfo }] = useState(userInfo.read() ?? { value: undefined });
  const t = useI18n("LOGIN");

  const handleUpdateLoginUserInfo = () => {
    userInfo.update({ value });
  };

  return (
    <Button
      type="submit"
      name={LOGIN_METHOD}
      variant="custom"
      size="custom"
      value={value}
      className={LoginButtonStyles({ value })}
      onClick={handleUpdateLoginUserInfo}
    >
      {children}
    </Button>
  );
};

export default Oauth2LoginButton;
