import { create } from "zustand";

import { Transaction, TransactionStatus } from "@/types/transaction.type";

export type TransactionListSort =
  | "Newest"
  | "Oldest"
  | "Highest Price"
  | "Lowest Price";

type TransactionListsStore = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  statusFilter: TransactionStatus | "";
  setStatusFilter: (status: TransactionStatus | "") => void;
  sortSelected: TransactionListSort;
  setSortSelected: (sort: TransactionListSort) => void;
  paginationCurrent: number;
  setPaginationCurrent: (page: number) => void;
  paginationLimit: number;
  setPaginationLimit: (value: number) => void;
};

export const useTransactionsListStore = create<TransactionListsStore>(
  (set, get) => {
    return {
      transactions: [],
      setTransactions: (transactions) => set({ transactions: transactions }),
      searchKeyword: "",
      setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
      statusFilter: "" as const,
      setStatusFilter: (status) => set({ statusFilter: status }),
      paginationLimit: 4,
      setPaginationLimit: (value) => set({ paginationLimit: value }),
      paginationCurrent: 1,
      setPaginationCurrent: (page) => set({ paginationCurrent: page }),
      sortSelected: "Newest",
      setSortSelected: (sort) => set({ sortSelected: sort }),
    };
  }
);
