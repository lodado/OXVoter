"use client";

import { useLocale } from "next-intl";
import { ComponentProps } from "react";

import useUrl from "@/shared/hooks/useUrl";
import { sanitizeUrl } from "@/shared/utils/sanitizeUrl";

import { LocaleLink } from "../../entities/Router/ui/Link";

const useLinkHref = (props: ComponentProps<typeof LocaleLink>) => {
  const { href = "", subDomain: _subDomain, custom = false, ...rest } = props;
  const { params } = useUrl();
  const locale = useLocale();

  const _href = href;
  let { subDomain = "" /* www */ } = params;
  subDomain = _subDomain || subDomain;

  const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
  const domain = isLocalhost ? "localhost" : process.env.NEXT_PUBLIC_DOMAIN;
  const protocol = isLocalhost ? "http" : "https";
  const port = typeof window !== "undefined" && window.location.port ? `:${window.location.port}` : "";

  const preSubDomain = isLocalhost ? "" : subDomain ? `${subDomain}.` : "";
  const postSubDomain = isLocalhost ? `${subDomain}` : "";

  // 서브도메인 및 locale prefix 추가하여 href 생성
  // const linkHref = custom ? _href : `${protocol}://${preSubDomain}${domain}${port}/${locale}/${postSubDomain}${_href}`;
  const linkHref = custom ? _href : `${protocol}://${preSubDomain}${domain}${port}/${locale}${_href}`;
  return sanitizeUrl(linkHref);
};

export default useLinkHref;
