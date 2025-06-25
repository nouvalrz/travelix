"use client";

import React, { useCallback } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Button } from "@heroui/button";
import Link from "next/link";
import { ChevronRight, Pencil } from "lucide-react";

import {
  TransactionStatusWithAdditional,
  TransactionWithAdditionalStatus,
} from "@/lib/store/useTransactiosListStore";
import TransactionStatusChip from "@/components/user/transactions/TransactionStatusChip";
import { TransactionItem } from "@/types/transactionItem.type";
import { formatDateTime } from "@/lib/formatDate";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const AdminDashboardClient = ({
  recentTransactions,
  pendingTransactionCount,
  waitingConfirmationTransactionCount,
  cancelledTransactionCount,
  expiredTransactionCount,
  failedTransactionCount,
  successTransactionCount,
}: {
  recentTransactions: TransactionWithAdditionalStatus[];
  pendingTransactionCount: number;
  waitingConfirmationTransactionCount: number;
  expiredTransactionCount: number;
  cancelledTransactionCount: number;
  successTransactionCount: number;
  failedTransactionCount: number;
}) => {
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
            </div>
          );
        default:
          return cellValue?.toString();
      }
    },
    []
  );

  return (
    <div>
      <h1 className="font-semibold text-xl">Transactions Summary</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-4 gap-3">
        <Card shadow="sm">
          <CardHeader>
            <TransactionStatusChip status="pending" />
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-xl">{pendingTransactionCount}</p>
              <p className="text-sm">Total</p>
            </div>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardHeader>
            <TransactionStatusChip status="waiting_confirmation" />
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-xl">
                {waitingConfirmationTransactionCount}
              </p>
              <p className="text-sm">Total</p>
            </div>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardHeader>
            <TransactionStatusChip status="expired" />
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-xl">{expiredTransactionCount}</p>
              <p className="text-sm">Total</p>
            </div>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardHeader>
            <TransactionStatusChip status="cancelled" />
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-xl">{cancelledTransactionCount}</p>
              <p className="text-sm">Total</p>
            </div>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardHeader>
            <TransactionStatusChip status="success" />
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-xl">{successTransactionCount}</p>
              <p className="text-sm">Total</p>
            </div>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardHeader>
            <TransactionStatusChip status="failed" />
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-xl">{failedTransactionCount}</p>
              <p className="text-sm">Total</p>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-8">
        <div className="flex gap-3 justify-between items-center">
          <h1 className="font-semibold text-xl">Recent Transactions</h1>
          <Button
            as={Link}
            color="primary"
            endContent={<ChevronRight className="size-5" />}
            href="/admin/transactions"
            variant="light"
          >
            See All
          </Button>
        </div>
        <Card className="mt-4" shadow="sm">
          <CardBody>
            <Table removeWrapper className="min-w-[800px]">
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
                items={recentTransactions}
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardClient;
