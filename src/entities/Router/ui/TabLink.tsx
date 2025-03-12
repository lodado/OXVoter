import { BookOpen, Search } from "lucide-react";
import React from "react";

import { LocaleLink } from "@/entities/Router";
import { PAGE_ROUTE } from "@/entities/Router/configs/route";

const isCurrentPage = (currentPage: string, targetPage: string) => {
  return currentPage === targetPage ? "active" : "inactive";
};

const TabLink = ({ currentPage }: { currentPage: string }) => {
  return (
    <div className="w-full inline-flex h-10 items-center justify-center rounded-md bg-tertiary-press p-1">
      <LocaleLink
        data-state={isCurrentPage(currentPage, PAGE_ROUTE.OCR)}
        href={PAGE_ROUTE.OCR}
        className="gap-2 w-full inline-flex items-center body-1 justify-center whispace-nowrap rounded-sm px-3 py-1.5 text-text-03 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-tertiary data-[state=active]:text-text-01 data-[state=active]:shadow-sm"
      >
        <Search className="w-4 h-4" />
        이미지 스캔
      </LocaleLink>

      <LocaleLink
        href={PAGE_ROUTE.WORDS}
        data-state={isCurrentPage(currentPage, PAGE_ROUTE.WORDS)}
        className="gap-2 w-full inline-flex items-center body-1 justify-center whispace-nowrap rounded-sm px-3 py-1.5 text-text-03 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-tertiary data-[state=active]:text-text-01 data-[state=active]:shadow-sm"
      >
        <BookOpen className="w-4 h-4" />
        단어장
      </LocaleLink>
    </div>
  );
};

export default TabLink;
