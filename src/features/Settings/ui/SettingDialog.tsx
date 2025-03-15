"use client";

import { Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { IconButton } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import { SettingDialogProvider } from "./SettingDialogProvider";
import SettingTab from "./SettingTab";

const SettingDialog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("settings");

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
    <SettingDialogProvider
      language={language}
      onChangeLanguage={onChangeLanguage}
      handleSubmitSetting={handleSubmitSetting}
    >
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
        <AlertDialog.Body className="relative max-h-[600px] h-[calc(80*var(--vh))] gap-3 overflow-x-hidden overflow-y-auto">
          <AlertDialog.Description className="sticky h-max text-text-03">
            {t("manage-app-settings-description")}
          </AlertDialog.Description>

          <SettingTab />
        </AlertDialog.Body>
      </AlertDialog>
    </SettingDialogProvider>
  );
};

export default SettingDialog;
