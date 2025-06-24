import React, { Suspense } from "react";

import DestinationsWrapper from "@/components/admin/destinations/DestinationsWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

export const metadata = {
  title: "Admin Destinations",
};

const AdminDestinationsPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Destinations Management</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <DestinationsWrapper />
      </Suspense>
    </div>
  );
};

export default AdminDestinationsPage;
