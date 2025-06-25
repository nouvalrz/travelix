import { Skeleton } from "@heroui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <Skeleton className="w-56 rounded-lg h-10" />
      <Skeleton className="w-full rounded-lg h-48 mt-6" />
      <Skeleton className="w-64 rounded-lg h-10 mt-12" />
      <Skeleton className="w-full rounded-lg h-72 mt-6" />
    </div>
  );
};

export default loading;
