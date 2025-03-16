"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, Input, ScrollArea, Switch, TextArea } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import RoleSettingTabs from "./RoleSettingTabs";

export default function RoleSettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("roleSetting");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <Button
        type="button"
        className="h-8"
        variant="primaryLine"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("button-label")}
      </Button>

      <AlertDialog className="" isVisible={isOpen} onChangeVisible={handleOpenChange}>
        <AlertDialog.Header className="">{t("dialog-title")}</AlertDialog.Header>
        <AlertDialog.Body className="relative max-h-[600px] scrollbar-hide h-[calc(80*var(--vh))] gap-3 overflow-x-hidden overflow-y-auto">
          <AlertDialog.Description className="sticky h-max text-text-02">{t("description")}</AlertDialog.Description>

          <RoleSettingTabs />
        </AlertDialog.Body>
      </AlertDialog>
    </>
  );
}
