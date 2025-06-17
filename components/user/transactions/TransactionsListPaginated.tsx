import React, { useEffect } from "react";
import { Pagination } from "@heroui/pagination";

import TransactionListItem from "./TransactionListItem";

import {
  TransactionWithAdditionalStatus,
  useTransactionsListStore,
} from "@/lib/store/useTransactiosListStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const TransactionsListPaginated = () => {
  const {
    transactions,
    searchKeyword,
    statusFilter,
    sortSelected,
    paginationCurrent,
    setPaginationCurrent,
    paginationLimit,
  } = useTransactionsListStore();

  const sortTransaction = (
    a: TransactionWithAdditionalStatus,
    b: TransactionWithAdditionalStatus
  ) => {
    if (sortSelected === "Newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortSelected === "Oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    const aTotalPrice = a.transaction_items.reduce(
      (acc, item) => acc + item.quantity * (item.price_discount ?? item.price),
      0
    );

    const bTotalPrice = b.transaction_items.reduce(
      (acc, item) => acc + item.quantity * (item.price_discount ?? item.price),
      0
    );

    if (sortSelected === "Highest Price") {
      return bTotalPrice - aTotalPrice;
    }
    if (sortSelected === "Lowest Price") {
      return aTotalPrice - bTotalPrice;
    }

    return 0;
  };

  const transactionQueryResults = transactions
    .filter(
      (transaction) =>
        transaction.invoiceId
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        transaction.transaction_items[0].title
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
    )
    .filter((transaction) =>
      !statusFilter ? true : transaction.status === statusFilter
    )
    .sort(sortTransaction);

  const startPagination = (paginationCurrent - 1) * paginationLimit;
  const endPagination = startPagination + paginationLimit;
  const pageTotal = Math.ceil(transactionQueryResults.length / paginationLimit);

  const handlePageChange = (page: number) => {
    setPaginationCurrent(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setPaginationCurrent(1);
  }, [searchKeyword, statusFilter, sortSelected]);

  return (
    <div>
      {transactionQueryResults.length > 0 ? (
        <div className="flex flex-col gap-3 my-8">
          {transactionQueryResults
            .slice(startPagination, endPagination)
            .map((transaction) => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <EmptyPlaceholder
            description={`There are no ${statusFilter} transactions`}
          />
        </div>
      )}
      {transactionQueryResults.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Pagination
            showControls
            page={paginationCurrent}
            total={pageTotal}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionsListPaginated;
