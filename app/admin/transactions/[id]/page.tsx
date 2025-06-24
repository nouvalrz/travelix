import React from "react";

import TransactionAdminDetail from "@/components/admin/transactions/TransactionAdminDetail";
import { convertToTransactionAdditionalStatus } from "@/lib/convertToTransactionWithExpired";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Transaction } from "@/types/transaction.type";

export const metadata = {
  title: "Edit Transaction",
};

const EditTransactionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetchApiFromServer("/transaction/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const transaction = (await response.json()).data as Transaction;
  const transactionWithAdditionalStatus =
    convertToTransactionAdditionalStatus(transaction);

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Edit Transaction :{" "}
        <span className="text-primary">{transaction.invoiceId}</span>
      </h1>
      <div className="mt-6">
        <TransactionAdminDetail transaction={transactionWithAdditionalStatus} />
      </div>
    </div>
  );
};

export default EditTransactionPage;
