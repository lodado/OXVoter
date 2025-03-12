import type { MetadataRoute } from "next";

import { PAGE_ROUTE } from "@/entities/Router/configs/route";
import { i18nOption } from "@/shared";

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL!;
const defaultImage = "/Logo.svg";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(PAGE_ROUTE).map(([key, path], index) => {
      return {
        url: webUrl + path,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: Math.max(0.5, 1 - index * 0.1),
        alternates: {
          languages: {
            ...i18nOption.locales.reduce((total: any, locale) => {
              total[locale] = `${webUrl}/${locale}${path}`;
              return total;
            }, {}),
          },
        },
      };
    }),
  ];
}
