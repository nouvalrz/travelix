import React from "react";

import { Transaction } from "@/types/transaction.type";
import TransactionsListClient from "@/components/user/transactions/TransactionsListClient";
import { fetchApiFromServer } from "@/lib/fetchApi";

export const metadata = {
  title: "Transactions",
};

const TransactionsPage = async () => {
  const response = await fetchApiFromServer("/my-transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const transactions = (await response.json()).data as Transaction[];

  return (
    <div className="mt-2">
      <h1 className="font-bold text-xl">Your Transactions</h1>
      <TransactionsListClient transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
