"use client";

import { useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, Input, ScrollArea, Switch, TextArea } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import RoleSettingTabs from "./RoleSettingTabs";

export default function RoleSettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);

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
        직업 설정
      </Button>

      <AlertDialog className="" isVisible={isOpen} onChangeVisible={handleOpenChange}>
        <AlertDialog.Header className="">게임 직업 설정</AlertDialog.Header>
        <AlertDialog.Body className="relative max-h-[600px] scrollbar-hide h-[calc(80*var(--vh))] gap-3 overflow-x-hidden overflow-y-auto">
          <AlertDialog.Description className="sticky h-max text-text-02">
            게임에서 사용할 직업과 특수 능력을 설정하세요.
          </AlertDialog.Description>

          <RoleSettingTabs />
        </AlertDialog.Body>
      </AlertDialog>
    </>
  );
}
