import React from "react";

import AdminNavbar from "@/components/admin/navbar/AdminNavbar";
import Breadcrumb from "@/components/Breadcrumb";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row max-h-screen items-start">
      <div className="h-full w-full lg:max-w-[280px]">
        <AdminNavbar />
      </div>
      <div className="flex-grow p-4 overflow-auto h-screen w-full">
        <Breadcrumb />
        <div className="mt-2 lg:mt-4 w-full ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
