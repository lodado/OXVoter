"use client";

import { HandHelping, Mail, UserCog } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { FormEvent } from "react";

import { supabaseInstance } from "@/shared/libs/supabase/supabase";
import { Button, Form, Input, Tab, TextArea } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import { postUserFeedback } from "../api/postUserFeedback";
import LanguageSelector from "./LanguageSelector";
import { useSettingDialogContext } from "./SettingDialogProvider";

const UserSettingTab = () => {
  const tSettings = useTranslations("settings");
  const tCommon = useTranslations("common");

  const dialogT = useTranslations("DIALOG");

  const { language, onChangeLanguage, handleSubmitSetting } = useSettingDialogContext();

  return (
    <Tab.Content className="flex flex-col mt-5 gap-4" value="tab1">
      <div className="flex flex-col gap-2">
        <div>{tSettings("userSettingsLanguage")}</div>
        <LanguageSelector value={language} onValueChange={onChangeLanguage} />
      </div>

      <div className="flex flex-col gap-2">
        <div>{tCommon("terms-of-service")}</div>

        <Link
          href="https://plump-turner-4a8.notion.site/Privacy-Policy-1b79a1fad68680d6a940f57104018b35?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          https://plump-turner-4a8.notion.site/Privacy-Policy-1b79a1fad68680d6a940f57104018b35?pvs=4
        </Link>
      </div>

      <AlertDialog.SubmitForm
        className="absolute bottom-0 w-full left-0"
        submitText={dialogT("SUBMITTEXT")}
        cancelText={dialogT("CANCELTEXT")}
        onSubmit={async (e) => {
          handleSubmitSetting(e);
        }}
      />
    </Tab.Content>
  );
};

const SupportTab = () => {
  const t = useTranslations("support");
  const { handleSubmitSetting } = useSettingDialogContext();

  const handleSubmitUserFeedback = async (e: FormEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    await postUserFeedback({
      userName: data.name as string,
      email: data.email as string,
      message: data.message as string,
    });

    handleSubmitSetting(e);
  };

  return (
    <Tab.Content value="tab2" className="h-max">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t("title")}</h3>
          <p className="text-sm text-text-02">{t("description")}</p>
          <Form className="" onSubmit={handleSubmitUserFeedback}>
            <Form.Field name="name">
              <Form.Label htmlFor="name">{t("form-label-name")}</Form.Label>
              <Form.Control asChild>
                <Input id="name" placeholder={t("form-placeholder-name")} required />
              </Form.Control>
              <Form.MessageContainer>
                <Form.Message match="valueMissing">{t("enter-content")}</Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Field name="email">
              <Form.Label htmlFor="email">{t("form-label-email")}</Form.Label>
              <Form.Control asChild>
                <Input id="email" type="email" placeholder={t("form-placeholder-email")} required />
              </Form.Control>
              <Form.MessageContainer>
                <Form.Message match="valueMissing">{t("enter-email")}</Form.Message>
                <Form.Message match="typeMismatch"> {t("enter-email")}</Form.Message>
                <Form.Message match="patternMismatch">{t("enter-email")}</Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Field name="message">
              <Form.Label htmlFor="message">{t("common-content")}</Form.Label>
              <Form.Control asChild>
                <TextArea id="message" placeholder={t("common-content")} className="w-full resize-none" required />
              </Form.Control>
              <Form.MessageContainer className="mb-6">
                <Form.Message match={(value) => value.length > 500}>{t("max-500-characters")}</Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Submit asChild>
              <Button className="sticky bottom-4 w-[calc(100%-4rem)] left-6">
                <Mail className="mr-2 h-4 w-4" />
                {t("form-button")}
              </Button>
            </Form.Submit>
          </Form>
        </div>
      </div>
    </Tab.Content>
  );
};

const SettingTab = () => {
  const t = useTranslations("settings");

  return (
    <Tab defaultValue="tab1">
      <Tab.List className="w-full">
        <Tab.Trigger className="flex flex-row gap-2 w-[50%]" value="tab1">
          <UserCog />
          {t("tabsUserSettings")}
        </Tab.Trigger>
        <Tab.Trigger className="flex flex-row gap-2 w-[50%]" value="tab2">
          <HandHelping />
          {t("tabsSupport")}
        </Tab.Trigger>
      </Tab.List>
      <UserSettingTab />

      <SupportTab />
    </Tab>
  );
};

export default SettingTab;
