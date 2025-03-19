import { NextRequest, NextResponse } from "next/server";

import { THIRD_PARTY_CONNECT_SRC_LIST, THIRD_PARTY_IMAGE_SRC_LIST } from "./thirdPartyList";

export const cspMiddleware = (request: NextRequest, response: NextResponse) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = ` 
 
    default-src 'self';
    style-src 'self' 'unsafe-inline' spoqa.github.io cdn.jsdelivr.net data:;
    img-src 'self' blob: data: ${THIRD_PARTY_IMAGE_SRC_LIST.join(" ")};
    font-src 'self' cdnjs.cloudflare.com spoqa.github.io cdn.jsdelivr.net data:;
    script-src 'wasm-unsafe-eval' 'self' ${
      process.env.NODE_ENV !== "production" ? `'unsafe-eval'` : ""
    } 'nonce-${nonce}' 'strict-dynamic' vercel.live vercel.com cdn.jsdelivr.net;
    script-src-elem  https://www.googletagmanager.com cdn.jsdelivr.net 'self' vercel.live vercel.com 'nonce-${nonce}';
    object-src 'none';
    connect-src ${THIRD_PARTY_CONNECT_SRC_LIST.join(" ")} data: 'self' blob: ;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    manifest-src 'self';
    report-uri https://o4506497206779904.ingest.sentry.io/api/4506497210253317/security/?sentry_key=c0d1bc230a8ad553b5f82c9efd56882a;
    report-to csp-endpoint;
  `; 

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  request.headers.set("x-nonce", nonce);
  request.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  response.headers.set("x-nonce", nonce);
  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return response;
};
