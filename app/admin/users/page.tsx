import React, { Suspense } from "react";

import UsersWrapper from "@/components/admin/users/UsersWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

const AdminUsersPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Users Management</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <UsersWrapper />
      </Suspense>
    </div>
  );
};

export default AdminUsersPage;
