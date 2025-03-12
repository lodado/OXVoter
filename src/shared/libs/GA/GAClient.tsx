"use client";

import Script from "next/script";
import React from "react";

import { GA_KEY } from "./constant";

const GAClient = ({ nonce }: { nonce: string }) => {
  return (
    <Script id="ga-script" nonce={nonce} strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_KEY}');
    `}
    </Script>
  );
};

export default GAClient;
