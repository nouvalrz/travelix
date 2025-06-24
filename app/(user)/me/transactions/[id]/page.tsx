import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Transaction } from "@/types/transaction.type";
import TransactionDetailClient from "@/components/user/transactions/TransactionDetailClient";

const fetchTransaction = async (id: string): Promise<Transaction> => {
  const response = await fetchApiFromServer("/transaction/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await response.json()).data;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const destination = await fetchTransaction(id);

  return {
    title: `${destination.invoiceId}`,
  };
};

const TransactionDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const transaction = await fetchTransaction(id);

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
