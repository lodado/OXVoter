import { setRequestLocale } from "next-intl/server";
import React from "react";

import { SettingDialog } from "@/features";
import { getLocalesListsForStateParams } from "@/shared/index.server";

import CreateRoom from "./CreateRoom";

export async function generateStaticParams() {
  return getLocalesListsForStateParams();
}

const page = ({ params }: { params: { locale: string } }) => {
  setRequestLocale(params.locale);

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="h-5 absolute top-5 right-5 z-[100]">
        <SettingDialog />
      </div>
      <CreateRoom />
    </div>
  );
};

export default page;
