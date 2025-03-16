"use client";

import { HandHelping, UserCog } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Tab } from "@/shared/ui";

import JobSettingTab from "./JobSettingTab";

const RoleSettingTabs = () => {
  const t = useTranslations("settings");

  return (
    <Tab defaultValue="tab1">
      <Tab.List className="w-full">
        <Tab.Trigger className="flex flex-row gap-2 w-[50%]" value="tab1">
          <UserCog />
          특수 능력
        </Tab.Trigger>
        <Tab.Trigger className="flex flex-row gap-2 w-[50%]" value="tab3">
          <HandHelping />
          직업 설정
        </Tab.Trigger>
      </Tab.List>

      <JobSettingTab />
    </Tab>
  );
};

export default RoleSettingTabs;
