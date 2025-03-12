import { notFound } from "next/navigation";
import { getRequestConfig as getRequestConfigNextInti } from "next-intl/server";

import i18nOption, { LANGUAGE_LIST } from "./shared/libs/i18n/lib/option";

const { locales } = i18nOption;

/** 버그로 import시 작동을 안함 */
const getRequestConfig = (async ({ locale }: { locale: (typeof LANGUAGE_LIST)[number] }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./shared/libs/i18n/lib/locales/${locale}.json`)).default,
  };
}) as any;

export default getRequestConfigNextInti(getRequestConfig);
