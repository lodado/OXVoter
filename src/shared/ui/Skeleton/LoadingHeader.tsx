import { ChevronLeft } from "lucide-react";
import React from "react";

import Header from "@/features/Navigation/ui/Header/Header";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

const LoadingHeader = () => {
  return (
    <>
      <div className="z-header fixed w-full md:w-[768px] top-0 bg-background-op-01">
        <>
          <Header className="z-header w-full md:w-[768px] h-[2.75rem] fixed top-0 flex flex-row justify-between items-center">
            <div className="py-[11px] w-full px-2 text-text-primary flex flex-row items-center gap-1">
              <ChevronLeft width={20} height={24} strokeWidth={3} />
              <Skeleton className="w-[32px] h-[32px]" />

              <div className="flex flex-col w-full md:w-[768px] gap-0.5 justify-evenly">
                <Skeleton className="w-[40%] h-[16px]" />

                <Skeleton className="w-[40%] h-[16px]" />
              </div>
            </div>

            <div />
          </Header>

          <div className="w-full h-[3.8rem] flex-shrink-0" role="none presentation" />
        </>

        <div
          className={`
          flex flex-col justify-center items-center
          px-7
          h-[4.7rem]
        `}
        >
          <Skeleton className="top-[4rem] flex-shrink-0 h-7 display-2 pb-2 flex flex-row justify-start mb-2 w-full text-text-01 items-center " />

          <Skeleton className="top-[4rem] flex-shrink-0 h-7 display-2 pb-2 flex flex-row justify-start mb-2 w-[20%] text-text-01 items-center " />
        </div>
      </div>
      <div className="w-full h-[3rem] flex-shrink-0" role="none presentation" />
    </>
  );
};

export default LoadingHeader;
