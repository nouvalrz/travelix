import React, { Suspense } from "react";

import PromosWrapper from "@/components/admin/promos/PromosWrapper";

const AdminPromosPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Promos Management</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <PromosWrapper />
      </Suspense>
    </div>
  );
};

export default AdminPromosPage;
