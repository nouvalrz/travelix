import React, { Suspense } from "react";

import MeSidebar from "@/components/user/me/MeSidebar";
import Breadcrumb from "@/components/Breadcrumb";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto container py-8">
      <div className="flex gap-6 items-start">
        <div className="w-[280px]">
          <Suspense fallback={<p>Loading...</p>}>
            <MeSidebar />
          </Suspense>
        </div>
        <div className="flex-grow">
          <Breadcrumb includeHome />
          <div className="w-full mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
