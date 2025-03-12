"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ShardLink from "/public/ShareLink.svg";
import { useToastStore } from "@/shared/ui/Toast/stores";

const CopyLinkButton = () => {
  const t = useTranslations("CopyLinkButton");
  const { addToast } = useToastStore();

  const handleCopyButtonClick = () => {
    addToast({
      type: "success",
      title: t("copy_success"),
      description: t("copy_success_description"),
    });
  };

  return (
    <CopyToClipboard
      text={typeof window !== "undefined" ? window.location.href : ""}
      onCopy={() => handleCopyButtonClick()}
    >
      <button type="button">
        <ShardLink />
      </button>
    </CopyToClipboard>
  );
};

export default CopyLinkButton;
