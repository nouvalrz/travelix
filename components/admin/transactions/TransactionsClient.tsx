"use client";

import React, { useCallback, useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { formatDateTime } from "@/lib/formatDate";
import { TransactionItem } from "@/types/transactionItem.type";
import {
  TransactionStatusWithAdditional,
  TransactionWithAdditionalStatus,
} from "@/lib/store/useTransactiosListStore";
import TransactionStatusChip from "@/components/user/transactions/TransactionStatusChip";

const statusValues: (TransactionStatusWithAdditional | "")[] = [
  "",
  "pending",
  "waiting_confirmation",
  "success",
  "failed",
  "cancelled",
  "expired",
];

const TransactionsClient = ({
  transactions,
}: {
  transactions: TransactionWithAdditionalStatus[];
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [statusSelected, setStatusSelected] = useState<
    TransactionStatusWithAdditional | ""
  >("");
  const rowsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const transactionsStatusFiltered = useMemo(() => {
    return transactions.filter((transaction) =>
      !statusSelected ? true : transaction.status === statusSelected
    );
  }, [transactions, statusSelected]);

  const transactionsSearched = useMemo(() => {
    return transactionsStatusFiltered.filter((transaction) =>
      transaction.invoiceId.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, transactionsStatusFiltered]);

  const pages = Math.ceil(transactionsSearched.length / rowsPerPage) || 1;

  const transactionsSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return [...transactionsSearched].sort((a, b) => {
      let aValue: string | number = a[
        column as keyof TransactionWithAdditionalStatus
      ] as string;
      let bValue: string | number = b[
        column as keyof TransactionWithAdditionalStatus
      ] as string;

      if (column === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue)
        return sortDescriptor.direction === "ascending" ? -1 : 1;
      if (aValue > bValue)
        return sortDescriptor.direction === "ascending" ? 1 : -1;

      return 0;
    });
  }, [sortDescriptor, transactionsSearched]);

  const transactionsPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactionsSorted.slice(start, end);
  }, [currentPage, transactionsSorted]);

  const renderCell = useCallback(
    (transaction: TransactionWithAdditionalStatus, columnKey: React.Key) => {
      const cellValue =
        transaction[columnKey as keyof TransactionWithAdditionalStatus];

      switch (columnKey) {
        case "transaction_items":
          const items = cellValue as TransactionItem[];

          return (
            <div>
              <p>{items[0].title}</p>
              {items.length > 1 && (
                <p className="text-xs">+{items.length - 1} items</p>
              )}
            </div>
          );

        case "status":
          const status = cellValue as TransactionStatusWithAdditional;

          return <TransactionStatusChip status={status} />;

        case "createdAt":
          return <p>{formatDateTime(cellValue as string)}</p>;
        case "actions":
          return (
            <div className="flex gap-2 items-center">
              <Button
                isIconOnly
                as={Link}
                color="primary"
                href={"/admin/transactions/" + transaction.id}
                variant="flat"
              >
                <Pencil className="size-5" />
              </Button>
              <Button isIconOnly color="danger" variant="flat">
                <Trash2 className="size-5" />
              </Button>
            </div>
          );
        default:
          return cellValue?.toString();
      }
    },
    []
  );

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <Input
          isClearable
          placeholder="Search by invoice..."
          value={searchKeyword}
          onValueChange={setSearchKeyword}
        />

        <div className="max-w-[240px] w-full">
          <Select
            classNames={{ value: "capitalize" }}
            maxListboxHeight={600}
            selectedKeys={new Set([statusSelected])}
            onSelectionChange={(value) => {
              setStatusSelected(
                value.currentKey as TransactionStatusWithAdditional | ""
              );
            }}
          >
            {statusValues.map((status) => (
              <SelectItem
                key={status}
                textValue={
                  status === "waiting_confirmation"
                    ? "Waiting for Confirmation"
                    : status
                      ? status
                      : "All Status"
                }
              >
                {status ? (
                  <TransactionStatusChip status={status} />
                ) : (
                  <Chip size="md" variant="flat">
                    All Status
                  </Chip>
                )}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Table
        className="mt-4"
        sortDescriptor={sortDescriptor}
        topContent={
          <div className="flex justify-between w-full items-center">
            <p className="text-sm font-medium">
              Total transactions : {transactions.length}
            </p>
            <Pagination
              showControls
              page={currentPage}
              total={pages}
              onChange={setCurrentPage}
            />
          </div>
        }
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="invoiceId">Invoice ID</TableColumn>
          <TableColumn key="transaction_items">Items</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="createdAt" allowsSorting>
            Created At
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={<EmptyPlaceholder />}
          items={transactionsPaginated}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsClient;
