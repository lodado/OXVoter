"use client";

import { CheckCircle, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { ComponentProps } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "react-qr-code";

import { useToastStore } from "../Toast/stores";
import Button from "./Button";

const CopyButton = (props: ComponentProps<typeof Button>) => {
  const t = useTranslations();
  const [copied, setCopied] = React.useState(false);
  const { addToast } = useToastStore();

  const { children, ...rest } = props;

  const handleCopyLink = () => {
    setCopied(true);
    addToast({
      type: "success",
      title: t("copyLink.success-title"),
      description: t("copyLink.success-description"),
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={typeof window !== "undefined" ? window.location.href : ""} onCopy={() => handleCopyLink()}>
      <Button
        variant="primaryLine"
        className="border-slate-600 body-2 rounded-md h-10 text-slate-200 hover:bg-slate-700"
        {...rest}
      >
        {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
        {children}
      </Button>
    </CopyToClipboard>
  );
};

export default CopyButton;
