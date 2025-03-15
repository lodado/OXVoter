import { setRequestLocale } from "next-intl/server";
import React from "react";

import { SettingDialog } from "@/features";
import { getLocalesListsForStateParams } from "@/shared/index.server";

import JoinRoom from "./JoinRoom";

export async function generateStaticParams() {
  return getLocalesListsForStateParams();
}

const page = ({ params }: { params: { locale: string } }) => {
  setRequestLocale(params.locale);

  return (
    <>
      <JoinRoom />
    </>
  );
};

export default page;
