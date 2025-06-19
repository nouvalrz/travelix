import React, { Suspense } from "react";

import UsersWrapper from "@/components/admin/users/UsersWrapper";

const AdminUsersPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Users Management</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersWrapper />
      </Suspense>
    </div>
  );
};

export default AdminUsersPage;
