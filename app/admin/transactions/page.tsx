import React, { Suspense } from "react";

import TransactionsWrapper from "@/components/admin/transactions/TransactionsWrapper";

const AdminTransactionsPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Transactions Management</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <TransactionsWrapper />
      </Suspense>
    </div>
  );
};

export default AdminTransactionsPage;
