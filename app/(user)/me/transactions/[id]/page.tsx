import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Transaction } from "@/types/transaction.type";
import TransactionDetailClient from "@/components/user/transactions/TransactionDetailClient";

const TransactionDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const response = await fetchApiFromServer("/transaction/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const transaction = (await response.json()).data as Transaction;

  return (
    <div className="mt-2">
      <h1 className="font-bold text-xl">
        Transaction #{transaction.invoiceId}
      </h1>
      <TransactionDetailClient transaction={transaction} />
    </div>
  );
};

export default TransactionDetailPage;
