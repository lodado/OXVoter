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
    <>
      <CreateRoom />
    </>
  );
};

export default page;
