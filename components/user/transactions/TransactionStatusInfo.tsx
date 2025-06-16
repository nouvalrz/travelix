import { Card, CardBody } from "@heroui/card";
import { ReceiptText } from "lucide-react";
import React from "react";

import TransactionStatusChip from "./TransactionStatusChip";

import { TransactionWithAdditionalStatus } from "@/lib/store/useTransactiosListStore";
import { formatDateTime } from "@/lib/formatDate";

const TransactionStatusInfo = ({
  transaction,
}: {
  transaction: TransactionWithAdditionalStatus;
}) => {
  return (
    <Card shadow="sm">
      <CardBody>
        <div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <ReceiptText className="size-5" />
              <p className="font-medium">Transaction Status</p>
            </div>
            <TransactionStatusChip status={transaction.status} />
          </div>
          <p className="mt-1">
            Order Date : {formatDateTime(transaction.orderDate)}
          </p>
          {transaction.status === "expired" && (
            <p className="mt-1">
              Expired Date : {formatDateTime(transaction.expiredDate)}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionStatusInfo;
