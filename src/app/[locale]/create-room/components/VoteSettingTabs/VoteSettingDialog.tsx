"use client";

import { set } from "lodash-es";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useState } from "react";

import { Banner } from "@/features/Banner";
import { Button, Input, ScrollArea, Switch, TextArea } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import { RawVoteProvider, useVoteContext } from "./VoteProvider";
import VoteSettingTabs from "./VoteSettingTabs";

export default function VoteSettingDialog() {
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
        투표 설정
      </Button>

      <AlertDialog className="" isVisible={isOpen} onChangeVisible={handleOpenChange}>
        <AlertDialog.Header className="">게임 방식 설정</AlertDialog.Header>
        <AlertDialog.Body className="relative max-h-[600px] scrollbar-hide h-[calc(80*var(--vh))] gap-3 overflow-x-hidden overflow-y-auto">
          <AlertDialog.Description className="sticky h-max text-text-02">
            게임 진행에 사용할 투표 방식과 진영을 설정하세요.
          </AlertDialog.Description>

          <VoteSettingTabs />
        </AlertDialog.Body>
      </AlertDialog>
    </>
  );
}
