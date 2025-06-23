import { Skeleton } from "@heroui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="px-4 py-8">
      <div className="mx-auto container">
        <Skeleton className="rounded-lg w-full h-[280px]" />
        <Skeleton className="rounded-lg w-full h-[160px] mt-12" />
        <Skeleton className="rounded-lg w-full h-[160px] mt-6" />
        <Skeleton className="rounded-lg w-full h-[160px] mt-6" />
      </div>
    </div>
  );
};

export default loading;
