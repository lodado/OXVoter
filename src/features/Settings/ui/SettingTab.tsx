"use client";

import React from "react";

import { Tab } from "@/shared/ui";

import LanguageSelector from "./LanguageSelector";
import { useSettingDialogContext } from "./SettingDialogProvider";

const UserSettingTab = () => {
  const { language, onChangeLanguage } = useSettingDialogContext();

  return (
    <Tab.Content className="flex flex-col mt-5 gap-2" value="tab1">
      <div>언어 설정</div>
      <LanguageSelector value={language} onValueChange={onChangeLanguage} />
    </Tab.Content>
  );
};

const SettingTab = () => {
  return (
    <Tab defaultValue="tab1">
      <Tab.List className="w-full">
        <Tab.Trigger className="w-[50%]" value="tab1">
          설정
        </Tab.Trigger>
        <Tab.Trigger className="w-[50%]" value="tab2">
          문의
        </Tab.Trigger>
      </Tab.List>
      <UserSettingTab />
      <Tab.Content value="tab2">탭 2의 콘텐츠</Tab.Content>
    </Tab>
  );
};

export default SettingTab;
