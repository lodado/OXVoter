"use client";

import { Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";

import { IconButton } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import { SettingDialogProvider } from "./SettingDialogProvider";
import SettingTab from "./SettingTab";

const SettingDialog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [language, setLanguage] = React.useState(locale);

  const onChangeLanguage = (newLocale: string) => {
    setLanguage(newLocale);
  };

  const handleSubmitSetting = async (e: React.SyntheticEvent) => {
    if (locale !== language) {
      const newPathname = pathname.replace(
        /^\/(ko|en|ja|zh|hi|fr|es|ar|bn|pt|id|it|vi|th|ms|ru|de|tr)/,
        `/${language}`
      );
      router.push(newPathname);
    }

    setIsDialogVisible(false);
  };

  return (
    <SettingDialogProvider language={language} onChangeLanguage={onChangeLanguage}>
      <IconButton
        variant="link"
        className="w-[50px] h-[50px]"
        onClick={() => {
          setIsDialogVisible(true);
        }}
      >
        <Settings />
      </IconButton>

      <AlertDialog isVisible={isDialogVisible} onChangeVisible={setIsDialogVisible}>
        <AlertDialog.Header>Settings</AlertDialog.Header>
        <AlertDialog.Body className="h-[50vh] gap-3">
          <AlertDialog.Description className="h-max text-text-03">
            앱 설정을 관리하고 개인화하세요.
          </AlertDialog.Description>

          <SettingTab />
        </AlertDialog.Body>
        <AlertDialog.SubmitForm
          submitText="확인"
          cancelText="취소"
          onSubmit={async (e) => {
            handleSubmitSetting(e);
          }}
        />
      </AlertDialog>
    </SettingDialogProvider>
  );
};

export default SettingDialog;
