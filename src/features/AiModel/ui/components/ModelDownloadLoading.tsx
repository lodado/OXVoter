'use client'

import { useTranslations } from "next-intl";
import React from "react";

import Spinner from "./Spinner.svg";

const ModelDownloadLoading = () => {
  const t = useTranslations();

  return (
    <>
      <div className="ml-2 rounded-full h-full flex items-center justify-center pl-2">
        <Spinner className="animate-spin" />
      </div>

      <div className="mr-[1.75rem]">
        <p className="text-text-primary subhead-2">{t("MODEL.DOWNLOAD-LOADING")}</p>
        <p className="body-1 text-text-03">{t("MODEL.DOWNLOAD-WAIT")}</p>
      </div>
    </>
  );
};

export default ModelDownloadLoading;
