import { Skeleton } from "@heroui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="mt-2">
      <Skeleton className="w-full h-16 rounded-lg" />
      <Skeleton className="w-full h-16 rounded-lg mt-4" />
      <Skeleton className="w-full h-[520px] rounded-lg mt-4" />
    </div>
  );
};

export default loading;
