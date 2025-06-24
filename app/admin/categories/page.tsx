import React, { Suspense } from "react";

import CategoriesWrapper from "@/components/admin/categories/CategoriesWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

const AdminCategoriesPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Categories Management</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <CategoriesWrapper />
      </Suspense>
    </div>
  );
};

export default AdminCategoriesPage;
