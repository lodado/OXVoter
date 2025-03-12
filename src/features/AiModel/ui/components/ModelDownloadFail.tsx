"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/shared/ui";

import { useFaceModelStore } from "../../model/faceModelStore";
import Error from "./Error.svg";

const ModelDownloadFail = () => {
  const t = useTranslations();
  const { loadModelWithProgress } = useFaceModelStore();

  return (
    <>
      <div className="ml-2 rounded-full h-full flex items-center justify-center pl-2">
        <Error />
      </div>

      <div className="">
        <p className="text-text-01 subhead-2">{t("MODEL.DOWNLOAD-FAIL")}</p>
        <p className="body-1 text-text-03">{t("MODEL.DOWNLOAD-RETRY")}</p>
      </div>

      <div>
        <Button className="mr-[1.75rem]" variant="line" onClick={loadModelWithProgress}>
          {t("MODEL.DOWNLOAD-RESUME")}
        </Button>
      </div>
    </>
  );
};

export default ModelDownloadFail;
