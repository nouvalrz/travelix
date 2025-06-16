"use client";

import React from "react";
import { Button } from "@heroui/button";
import clsx from "clsx";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";

import {
  TransactionListSort,
  TransactionStatusWithAdditional,
  useTransactionsListStore,
} from "@/lib/store/useTransactiosListStore";

const soryOptions: TransactionListSort[] = [
  "Newest",
  "Oldest",
  "Highest Price",
  "Lowest Price",
];

const TransactionsListQuery = () => {
  const {
    setStatusFilter,
    statusFilter,
    sortSelected,
    setSortSelected,
    transactions,
    searchKeyword,
    setSearchKeyword,
  } = useTransactionsListStore();

  const filterOptions: Record<TransactionStatusWithAdditional | "", number> = {
    "": transactions.length,
    pending: transactions.filter(
      (transaction) => transaction.status === "pending"
    ).length,
    waiting_confirmation: transactions.filter(
      (transaction) => transaction.status === "waiting_confirmation"
    ).length,
    expired: transactions.filter(
      (transaction) => transaction.status === "expired"
    ).length,
    success: transactions.filter(
      (transaction) => transaction.status === "success"
    ).length,
    cancelled: transactions.filter(
      (transaction) => transaction.status === "cancelled"
    ).length,
    failed: transactions.filter(
      (transaction) => transaction.status === "failed"
    ).length,
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <div className="flex-grow">
          <Input
            placeholder="Search by invoice ID or destination name..."
            startContent={<Search className="size-5 text-gray-500" />}
            value={searchKeyword}
            onValueChange={(keyword) => setSearchKeyword(keyword)}
          />
        </div>
        <div className="w-[300px] flex-shrink-0">
          <Select
            selectedKeys={new Set([sortSelected])}
            onSelectionChange={(key) =>
              setSortSelected(key.currentKey as TransactionListSort)
            }
          >
            {soryOptions.map((sort) => (
              <SelectItem key={sort}>{sort}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex gap-2 items-center  mt-3">
        {Object.entries(filterOptions).map(([key, value]) => (
          <Button
            key={key}
            className={clsx("capitalize border-1")}
            color="primary"
            variant={statusFilter === key ? "solid" : "bordered"}
            onPress={() =>
              setStatusFilter(key as TransactionStatusWithAdditional | "")
            }
          >
            {key === "waiting_confirmation"
              ? "Waiting for Confirmation"
              : key
                ? key
                : "All"}{" "}
            ({value})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TransactionsListQuery;
