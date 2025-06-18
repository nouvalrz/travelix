import React from "react";

import TransactionsClient from "./TransactionsClient";

import { convertToTransactionAdditionalStatus } from "@/lib/convertToTransactionWithExpired";
import { Transaction } from "@/types/transaction.type";
import { fetchApiFromServer } from "@/lib/fetchApi";

const TransactionsWrapper = async () => {
  const response = await fetchApiFromServer("/all-transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const transactions = (await response.json()).data as Transaction[];

  const transactionsWithAdditonalStatus = transactions.map(
    convertToTransactionAdditionalStatus
  );

  return <TransactionsClient transactions={transactionsWithAdditonalStatus} />;
};

export default TransactionsWrapper;
