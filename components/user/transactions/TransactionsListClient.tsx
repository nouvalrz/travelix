"use client";
import React, { useEffect } from "react";

import TransactionsListQuery from "./TransactionsListQuery";
import TransactionsListPaginated from "./TransactionsListPaginated";

import { Transaction } from "@/types/transaction.type";
import { useTransactionsListStore } from "@/lib/store/useTransactiosListStore";

const TransactionsListClient = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const { setTransactions } = useTransactionsListStore();

  useEffect(() => {
    if (transactions.length > 0) {
      setTransactions(transactions);
    }
  }, [transactions]);

  return (
    <div>
      <TransactionsListQuery />
      <TransactionsListPaginated />
    </div>
  );
};

export default TransactionsListClient;
