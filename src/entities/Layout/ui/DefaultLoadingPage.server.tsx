import React from "react";

import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { LoadingHeader } from "@/shared/ui/Skeleton";
import ListSkeleton from "@/shared/ui/Skeleton/ListSkeleton";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

const DefaultLoadingPage = async () => {
  return (
    <>
      <ReactiveLayout>
        <LoadingHeader />

        <main className="flex flex-col w-full justify-center flex-grow ">
          <div className="flex-grow flex flex-col items-center w-full px-16 mt-[6rem] gap-2">
            <div className="w-full flex flex-row justify-evenly gap-2">
              <Skeleton className="w-full h-[172px]" />

              <Skeleton className="w-full h-[172px]" />
            </div>

            <div className="flex flex-row justify-start w-full my-4 mt-6  gap-1">
              <Skeleton className="w-[28px] h-7 rounded-2xl" />
              <Skeleton className="w-[45px] h-7 rounded-2xl" />
              <Skeleton className="w-[45px] h-7 rounded-2xl" />
              <Skeleton className="w-[45px] h-7 rounded-2xl" />
            </div>

            <div className="w-full flex flex-col gap-2">
              <ListSkeleton />

              <ListSkeleton />

              <ListSkeleton />

              <ListSkeleton />
            </div>
          </div>

          <div role="none presentation" className={"h-[200px]"}></div>
        </main>
        <nav
          className={`z-nav flex bg-background-op-01 flex-col justify-center items-center w-full md:w-[768px] gap-3 px-6 pt-6 fixed bottom-0 
            pb-[calc(1.5rem+var(--safe-area-bottom))]
        `}
        ></nav>
      </ReactiveLayout>
    </>
  );
};

export default DefaultLoadingPage;
