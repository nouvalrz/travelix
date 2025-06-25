import React, { Suspense } from "react";

import MeSidebar from "@/components/user/me/MeSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import MeSidebarPlaceholder from "@/components/user/me/MeSidebarPlaceholder";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto container py-8 px-4">
      <div className="flex gap-6 items-start lg:flex-row flex-col">
        <div className="w-full lg:w-[320px]">
          <Suspense fallback={<MeSidebarPlaceholder />}>
            <MeSidebar />
          </Suspense>
        </div>
        <div className="flex-grow w-full">
          <Breadcrumb includeHome />
          <div className="w-full mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
