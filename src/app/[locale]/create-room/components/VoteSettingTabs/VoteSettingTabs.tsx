"use client";

import { Flag, Vote } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Tab } from "@/shared/ui";

import FactionSettingTab from "./FactionSettingTab";
import VoteSettingTab from "./VoteSettingTab";

const VoteSettingTabs = () => {
  const t = useTranslations("settings");

  return (
    <Tab defaultValue="tab0" className="flex-grow">
      <Tab.List className="w-full ">
        <Tab.Trigger className="flex flex-row gap-2 w-[50%]" value="tab0">
          <Vote />
          투표 방식
        </Tab.Trigger>
        <Tab.Trigger className="flex flex-row gap-2 w-[50%]" value="tab1">
          <Flag />
          진영 설정
        </Tab.Trigger>
      </Tab.List>

      <VoteSettingTab />
      <FactionSettingTab />
    </Tab>
  );
};

export default VoteSettingTabs;
