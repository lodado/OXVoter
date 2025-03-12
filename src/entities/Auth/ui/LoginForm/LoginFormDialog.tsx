"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { AlertDialog } from "@/shared/ui/Dialog";

import { useAuthStore } from "../../client/models/store/AuthStore";
import LoginForm from "./LoginForm";

const LoginFormDialog = () => {
  const t = useTranslations("LoginFormDialog");
  const { isLoginFormDialogVisible, setLoginFormDialogVisible } = useAuthStore();

  return (
    <AlertDialog
      swipePercent={0.4}
      className="h-[300px]"
      isVisible={isLoginFormDialogVisible}
      onChangeVisible={setLoginFormDialogVisible}
    >
      <AlertDialog.Header className="flex flex-col gap-[1.1rem]">
        <h1>{t("please_login")}</h1>
        <div className="w-screen h-[1.9px] bg-border-borderOpaque"></div>
      </AlertDialog.Header>
      <AlertDialog.Body className="flex flex-col flex-start">
        <LoginForm />
      </AlertDialog.Body>
    </AlertDialog>
  );
};

export default LoginFormDialog;
