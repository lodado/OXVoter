"use client";

import Link from "next/link";
import React, { ComponentProps } from "react";

import { useLinkHref } from "@/shared/hooks";
import { cn } from "@/shared/utils";

const LocaleLink = (props: ComponentProps<typeof Link> & { href?: string; subDomain?: string; custom?: boolean }) => {
  const { href = "", subDomain: _subDomain, custom = false, className, ...rest } = props;
  const linkHref = useLinkHref(props);

  return <Link {...rest} className={cn(className)} href={linkHref!} />;
};

export default LocaleLink;
