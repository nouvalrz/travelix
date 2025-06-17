import { Skeleton } from "@heroui/skeleton";
import React from "react";

const HomeBannerPlaceholder = () => {
  return (
    <div className="px-4  py-12">
      <div className="container mx-auto">
        <div className="w-full h-[280px] md:h-[400px]">
          <Skeleton className="rounded-xl w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default HomeBannerPlaceholder;
