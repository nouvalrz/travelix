import React, { Suspense } from "react";

import ProfileWrapper from "@/components/admin/Profile/ProfileWrapper";

export const metadata = {
  title: "Admin Profile",
};

const AdminProfilePage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">My Profile</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ProfileWrapper />
      </Suspense>
    </div>
  );
};

export default AdminProfilePage;
