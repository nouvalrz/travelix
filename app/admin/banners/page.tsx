import React, { Suspense } from "react";

import BannersWrapper from "@/components/admin/banners/BannersWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

export const metadata = {
  title: "Admin Banners",
};

const AdminBannersPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Banners Management</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <BannersWrapper />
      </Suspense>
    </div>
  );
};

export default AdminBannersPage;
