import React from "react";

import TransactionPaymentInfo from "./TransactionPaymentInfo";
import TransactionStatusInfo from "./TransactionStatusInfo";
import TransactionItemsInfo from "./TransactionItemsInfo";

import { Transaction } from "@/types/transaction.type";
import { convertToTransactionAdditionalStatus } from "@/lib/convertToTransactionWithExpired";

const TransactionDetailClient = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const transactionWithExpired =
    convertToTransactionAdditionalStatus(transaction);

  return (
    <div>
      <div className="mt-4">
        <TransactionStatusInfo transaction={transactionWithExpired} />
      </div>
      <div className="mt-4">
        <TransactionPaymentInfo transaction={transactionWithExpired} />
      </div>
      <div className="mt-4">
        <TransactionItemsInfo transaction={transactionWithExpired} />
      </div>
    </div>
  );
};

export default TransactionDetailClient;
