import { create } from "zustand";

import { convertToTransactionAdditionalStatus } from "../convertToTransactionWithExpired";

import { Transaction, TransactionStatus } from "@/types/transaction.type";

export type TransactionListSort =
  | "Newest"
  | "Oldest"
  | "Highest Price"
  | "Lowest Price";

export type TransactionStatusWithAdditional =
  | TransactionStatus
  | "expired"
  | "waiting_confirmation";
export interface TransactionWithAdditionalStatus
  extends Omit<Transaction, "status"> {
  status: TransactionStatusWithAdditional;
}

type TransactionListsStore = {
  initialized: boolean;
  transactions: TransactionWithAdditionalStatus[];
  setTransactions: (transactions: Transaction[]) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  statusFilter: TransactionStatusWithAdditional | "";
  setStatusFilter: (status: TransactionStatusWithAdditional | "") => void;
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
      initialized: false,
      transactions: [],
      setTransactions: (transactions) => {
        const transactionsWithExpired = transactions.map(
          convertToTransactionAdditionalStatus
        );

        set({ transactions: transactionsWithExpired });
        set({ initialized: true });
      },
      searchKeyword: "",
      setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
      statusFilter: "" as const,
      setStatusFilter: (status) => set({ statusFilter: status }),
      paginationLimit: 6,
      setPaginationLimit: (value) => set({ paginationLimit: value }),
      paginationCurrent: 1,
      setPaginationCurrent: (page) => set({ paginationCurrent: page }),
      sortSelected: "Newest",
      setSortSelected: (sort) => set({ sortSelected: sort }),
    };
  }
);
