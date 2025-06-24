import { Skeleton } from "@heroui/skeleton";
import React from "react";

const AdminTablePagePlaceholder = () => {
  return (
    <div className="mt-6">
      <Skeleton className="rounded-lg w-full h-10" />
      <Skeleton className="rounded-lg w-full h-[600px] mt-4" />
    </div>
  );
};

export default AdminTablePagePlaceholder;
