import { contextBuildHelper } from "@/shared";

export const [SettingDialogProvider, useSettingDialogContext] = contextBuildHelper<{
  language: string;
  onChangeLanguage: (newLocale: string) => void;

  handleSubmitSetting: (e: React.SyntheticEvent) => void;
}>({ id: "feature/settings" });
