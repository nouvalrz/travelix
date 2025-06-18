import React, { Suspense } from "react";

import DestinationsWrapper from "@/components/admin/destinations/DestinationsWrapper";

const AdminDestinationsPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Destinations Management</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DestinationsWrapper />
      </Suspense>
    </div>
  );
};

export default AdminDestinationsPage;
