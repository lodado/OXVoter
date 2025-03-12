import React from "react";

import Skeleton from "./Skeleton";

const ListSkeleton = () => {
  return (
    <>
      <div className="w-full py-3 flex flex-row items-center gap-4">
        <div>
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className=" flex flex-row gap-1">
            <Skeleton className="w-[22px] h-[17px]" />
            <Skeleton className="w-[43px] h-[17px]" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-row gap-1 pr-[20px]">
              <Skeleton className="w-full h-[22px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSkeleton;
