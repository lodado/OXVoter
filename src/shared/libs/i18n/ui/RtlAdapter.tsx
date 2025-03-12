"use client";

import { useLocale } from "next-intl";
import React, { useEffect } from "react";

const RtlAdapter = () => {
  const locale = useLocale();
  useEffect(() => {
    if (locale === "ar") {
      document.documentElement.setAttribute("dir", "rtl"); // RTL 적용
    } else {
      document.documentElement.setAttribute("dir", "ltr"); // LTR 적용
    }
  }, [locale]);

  return <></>;
};

export default RtlAdapter;
