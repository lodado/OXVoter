import { getTranslations, setRequestLocale } from "next-intl/server";

import { LocaleLink } from "@/entities/Router";
import { getLocalesListsForStateParams } from "@/shared/index.server";
import { Button, FireworkCanvas } from "@/shared/ui";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { ToastViewPort } from "@/shared/ui/Toast";
import GameHeader from "@/widgets/Settings/ui/GameHeader";

export async function generateStaticParams() {
  return getLocalesListsForStateParams();
}

export default async function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("Home");

  return (
    <ReactiveLayout
      className="flex w-full h-full flex-col min-h-[calc(100*var(--vh)-1.25rem)] justify-center items-center"
      outerClassName="relative"
      outerPreviousChildren={<GameHeader isMain={true} />}
    >
      <FireworkCanvas />

      <main className="w-full max-w-md space-y-8 rounded-xl bg-slate-800/50 p-8 shadow-lg backdrop-blur">
        <div className="flex flex-col w-full justify-center items-center text-center">
          <h1 className="display-3 tracking-tight">{t("title")}</h1>
          <p className="mt-3 text-slate-300 heading-01">{t("description")} 🔥</p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <LocaleLink href="/create-room" className="w-full ">
            <Button className="w-full h-[2.9rem]">{t("createRoom")}</Button>
          </LocaleLink>
          <LocaleLink href="/join-room" className="w-full">
            <Button
              variant="custom"
              className="w-full h-[2.9rem] border border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              {t("joinRoom")}
            </Button>
          </LocaleLink>
        </div>
      </main>
      <ToastViewPort key="viewPort" className="bottom-[3rem]" />
    </ReactiveLayout>
  );
}
