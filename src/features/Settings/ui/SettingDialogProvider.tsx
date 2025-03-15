import { contextBuildHelper } from "@/shared";

export const [SettingDialogProvider, useSettingDialogContext] = contextBuildHelper<{
  language: string;
  onChangeLanguage: (newLocale: string) => void;
}>({ id: "feature/settings" });
