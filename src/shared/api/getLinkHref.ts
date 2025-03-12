import { getLocale } from "next-intl/server";
import { ComponentProps } from "react";

import { sanitizeUrl } from "@/shared/utils/sanitizeUrl";

import SeverLocaleLink from "../../entities/Router/ui/Link/ServerLocaleLink.server";
import { IS_DEPLOYMENT } from "../constants";

const isLocalhost = !IS_DEPLOYMENT;

export const getLinkHref = async (props: ComponentProps<typeof SeverLocaleLink>) => {
  const { href = "", subDomain: _subDomain, custom = false, ...rest } = props;

  const locale = await getLocale();

  const _href = href;

  let subDomain = ""; // wwww
  subDomain = _subDomain || subDomain;

  const domain = isLocalhost ? "localhost" : process.env.NEXT_PUBLIC_DOMAIN;
  const protocol = isLocalhost ? "http" : "https";
  const port = isLocalhost ? `:3000` : "";

  const preSubDomain = isLocalhost ? "" : subDomain ? `${subDomain}.` : "";
  const postSubDomain = isLocalhost ? `${subDomain}` : "";

  // 서브도메인 및 locale prefix 추가하여 href 생성
  //  const linkHref = custom ? _href : `${protocol}://${preSubDomain}${domain}${port}/${locale}/${postSubDomain}${_href}`;

  const linkHref = custom ? _href : `${protocol}://${preSubDomain}${domain}${port}/${locale}${_href}`;
  return sanitizeUrl(linkHref)!;
};
