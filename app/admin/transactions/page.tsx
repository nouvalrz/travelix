import React, { Suspense } from "react";

import TransactionsWrapper from "@/components/admin/transactions/TransactionsWrapper";
import AdminTablePagePlaceholder from "@/components/admin/AdminTablePagePlaceholder";

const AdminTransactionsPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Transactions Management</h1>
      <Suspense fallback={<AdminTablePagePlaceholder />}>
        <TransactionsWrapper />
      </Suspense>
    </div>
  );
};

export default AdminTransactionsPage;
