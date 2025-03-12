"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const ModelDownloadSuccess = () => {
  const t = useTranslations();

  return (
    <>
      <div className="ml-2 rounded-full h-full flex items-center justify-center pl-2 text-text-success">
        <Check />
      </div>

      <div className="mr-[1.75rem]">
        <p className="text-text-success subhead-2">{t("MODEL.DOWNLOAD-SUCCESS")}</p>
        <p className="body-1 text-text-03">{t("MODEL.DOWNLOAD-COMPLETE")}</p>
      </div>
    </>
  );
};

export default ModelDownloadSuccess;
