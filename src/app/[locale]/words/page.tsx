import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";

import { TabLink } from "@/entities/Router";
import { PAGE_ROUTE } from "@/entities/Router/configs/route";
import { ImageScanner } from "@/features/ImageOcrScanner";
import { getLocalesListsForStateParams } from "@/shared/libs/i18n/server/getLocalesListsForStateParams";
import { JsonLdScript, ScrollLock } from "@/shared/ui";
import { Motion } from "@/shared/ui/animation/animation";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { getMetadata } from "@/shared/utils/index.server";
import VocabularyContainer from "@/widgets/VocabularyList/ui/VocabularyContainer";

/* 
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("MAINPAGE");

  return getMetadata({
    title: t("title"),
    description: t("description"),
    path: PAGE_ROUTE.MAIN,
    keywords: "face comparison, parents, similarity, fun, family",
    locale,
  });
}
*/

export async function generateStaticParams() {
  return getLocalesListsForStateParams();
}

const Page = async ({ params }: { params: { locale: string } }) => {
  setRequestLocale(params.locale);
  const t = await getTranslations("MAINPAGE");

  return (
    <>
      <JsonLdScript
        customMeta={{
          title: t("title"),
          url: PAGE_ROUTE.MAIN,
          description: t("description"),
          date: new Date().toISOString(),
        }}
      />

      <ReactiveLayout>
        <main className="flex flex-col items-center w-full h-screen pt-[3rem] px-[2rem] gap-6">
          <h1 className="display-1 flex flex-row text-center justify-center mb-2 w-full text-text-01 items-center">
            영어 단어장
          </h1>

          <TabLink currentPage={PAGE_ROUTE.WORDS} />

          <div className="flex flex-col items-center text-center mb-4 w-full h-full overflow-y-auto gap-6">
            <VocabularyContainer />
          </div>
        </main>
      </ReactiveLayout>
    </>
  );
};

export default Page;
