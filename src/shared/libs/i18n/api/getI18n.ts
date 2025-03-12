import { getTranslations as getI18n } from 'next-intl/server'

const cachedGetI18n = getI18n as any

export { cachedGetI18n as getI18n, getI18n as rawGetI18n }
