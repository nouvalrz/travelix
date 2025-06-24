import React, { Suspense } from "react";

import PromosWrapper from "@/components/admin/promos/PromosWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

export const metadata = {
  title: "Admin Promos",
};

const AdminPromosPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Promos Management</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <PromosWrapper />
      </Suspense>
    </div>
  );
};

export default AdminPromosPage;
