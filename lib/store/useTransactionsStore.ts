import { create } from "zustand";

import { fetchTransactions } from "../data/client/transactions";

import { Transaction } from "@/types/transaction.type";

type TransactionsStore = {
  transactions: Transaction[];
  transactionsLoading: boolean;
  fetchTransactions: () => Promise<void>;
  totalTransactions: () => number;
};

export const useTransactionsStore = create<TransactionsStore>((set, get) => {
  return {
    transactions: [],
    transactionsLoading: true,
    fetchTransactions: async () => {
      set({ transactionsLoading: true });

      const response = await fetchTransactions();
      const transactions = response.data as Transaction[];

      set({ transactions: transactions, transactionsLoading: false });
    },
    totalTransactions: () => get().transactions.length,
  };
});
