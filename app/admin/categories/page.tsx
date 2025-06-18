import React, { Suspense } from "react";

import CategoriesWrapper from "@/components/admin/categories/CategoriesWrapper";

const AdminCategoriesPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Categories Management</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CategoriesWrapper />
      </Suspense>
    </div>
  );
};

export default AdminCategoriesPage;
