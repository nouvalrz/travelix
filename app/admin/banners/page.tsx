import React, { Suspense } from "react";

import BannersWrapper from "@/components/admin/banners/BannersWrapper";

const AdminBannersPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Banners Management</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <BannersWrapper />
      </Suspense>
    </div>
  );
};

export default AdminBannersPage;
