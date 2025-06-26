import React, { Suspense } from "react";

import ProfileWrapper from "@/components/admin/Profile/ProfileWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

export const metadata = {
  title: "Admin Profile",
};

const AdminProfilePage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">My Profile</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <ProfileWrapper />
      </Suspense>
    </div>
  );
};

export default AdminProfilePage;
