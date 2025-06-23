import { Skeleton } from "@heroui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="px-4 py-8">
      <div className="mx-auto container">
        <div className="flex gap-8 items-start">
          <div className=" flex-grow">
            <Skeleton className="rounded-lg w-full h-16" />
            <Skeleton className="rounded-lg w-full h-40 mt-4" />
            <Skeleton className="rounded-lg w-full h-40 mt-4" />
            <Skeleton className="rounded-lg w-full h-40 mt-4" />
            <Skeleton className="rounded-lg w-full h-40 mt-4" />
          </div>
          <div className="w-[400px] flex-shrink-0 lg:block hidden">
            <Skeleton className="rounded-lg w-full h-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
