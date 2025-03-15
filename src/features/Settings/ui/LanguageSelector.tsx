"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { ComponentProps, useMemo, useState } from "react";

import { Select } from "@/shared/ui";

const LanguageSelector = (props: ComponentProps<typeof Select>) => {
  const t = useTranslations();
  const locale = useLocale();

  const [value, setValue] = useState(locale);

  const languages = useMemo(
    () => [
      { value: "ko", label: t("LANG.ko"), emoji: "🇰🇷" },
      { value: "en", label: t("LANG.en"), emoji: "🇬🇧" },
      { value: "ja", label: t("LANG.ja"), emoji: "🇯🇵" },
      { value: "zh", label: t("LANG.zh"), emoji: "🇨🇳" },
      { value: "hi", label: t("LANG.hi"), emoji: "🇮🇳" },
      { value: "fr", label: t("LANG.fr"), emoji: "🇫🇷" },
      { value: "es", label: t("LANG.es"), emoji: "🇪🇸" },
      { value: "ar", label: t("LANG.ar"), emoji: "🇸🇦" },
      { value: "bn", label: t("LANG.bn"), emoji: "🇧🇩" },
      { value: "pt", label: t("LANG.pt"), emoji: "🇵🇹" },
      { value: "id", label: t("LANG.id"), emoji: "🇮🇩" },
      { value: "it", label: t("LANG.it"), emoji: "🇮🇹" },
      { value: "vi", label: t("LANG.vi"), emoji: "🇻🇳" },
      { value: "th", label: t("LANG.th"), emoji: "🇹🇭" },
      { value: "ms", label: t("LANG.ms"), emoji: "🇲🇾" },
      { value: "ru", label: t("LANG.ru"), emoji: "🇷🇺" },
      { value: "de", label: t("LANG.de"), emoji: "🇩🇪" },
      { value: "tr", label: t("LANG.tr"), emoji: "🇹🇷" },
    ],
    [t]
  );

  return (
    <div className="flex flex-row w-full">
      <Select
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          props.onValueChange?.(newValue);
        }}
        {...props}
      >
        <Select.Trigger className="min-w-[130px] w-[50%] max-w-[400px] flex items-center justify-center relative">
          <Select.Value placeholder="" />
          <Select.Icon className="SelectIcon absolute right-4">
            <ChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content align="center" className="flex flex-col min-w-[130px] w-[30vw] max-w-[200px] max-h-[50vh]">
          <Select.Group>
            <Select.Label>Lang</Select.Label>
            {languages.map((language) => (
              <Select.Item className="flex gap-5  text-text-success" value={language.value} key={language.value}>
                <div>
                  <span className="text-text-01 mr-2">{language.label}</span>
                  <span>{language.emoji}</span>
                </div>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  );
};

export default LanguageSelector;
