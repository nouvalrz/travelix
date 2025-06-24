"use client";
import React, { useEffect } from "react";

import TransactionsListQuery from "./TransactionsListQuery";
import TransactionsListPaginated from "./TransactionsListPaginated";
import TransactionListItemPlaceholder from "./TransactionListItemPlaceholder";

import { Transaction } from "@/types/transaction.type";
import { useTransactionsListStore } from "@/lib/store/useTransactiosListStore";

const TransactionsListClient = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const { setTransactions, initialized } = useTransactionsListStore();

  useEffect(() => {
    setTransactions(transactions);
  }, []);

  if (!initialized) return <TransactionListItemPlaceholder />;

  return (
    <div>
      <TransactionsListQuery />
      <TransactionsListPaginated />
    </div>
  );
};

export default TransactionsListClient;
