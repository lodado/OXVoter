import Link from "next/link";
import React, { ComponentProps } from "react";

import { getLinkHref } from "@/shared/api";
import { Motion } from "@/shared/ui/animation/animation";
import { cn } from "@/shared/utils";

const ServerLocaleLink = async (
  props: ComponentProps<typeof Link> & { href?: string; subDomain?: string; custom?: boolean }
) => {
  const { href = "", subDomain: _subDomain, custom = false, className, ...rest } = props;
  const linkHref = await getLinkHref(props);

  return (
    <Motion
      componentType={"div"}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", duration: 0.25 }}
    >
      <Link {...rest} className={cn("select-none", className)} href={linkHref!} />
    </Motion>
  );
};

export default ServerLocaleLink;
