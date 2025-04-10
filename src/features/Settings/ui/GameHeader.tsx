"use client";

import { ArrowBigLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import { useSocketPublisher } from "@/entities/Socket/hooks";
import { SettingDialog } from "@/features";

import { PAGE_ROUTE } from "../../../entities/Router/configs/route";
import LocaleLink from "../../../entities/Router/ui/Link/LocaleLink";

const GameHeader = ({ isMain = false }: { isMain?: boolean }) => {
  return (
    <div className="sticky flex flex-row justify-between w-full h-5 top-0 left-0 right-0 px-2">
      {isMain ? (
        <div></div>
      ) : (
        <LocaleLink
          className="h-2 top-1 left-10 py-[11px] px-2 text-text-primary flex flex-row gap-1 z-[100]"
          href={PAGE_ROUTE.MAIN}
        >
          <ArrowBigLeft width={30} height={30} strokeWidth={2} />
        </LocaleLink>
      )}
      <div className="h-5 top-1 right-10 z-[100]">
        <SettingDialog />
      </div>
    </div>
  );
};

export default GameHeader;
