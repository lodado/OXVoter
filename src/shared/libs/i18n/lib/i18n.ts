import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import i18nOption from './option'

const { locales } = i18nOption

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
}) as any;
