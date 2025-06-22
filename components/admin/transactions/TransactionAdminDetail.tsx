import React from "react";

import TransactionAdminAction from "./TransactionAdminAction";

import { TransactionWithAdditionalStatus } from "@/lib/store/useTransactiosListStore";
import TransactionStatusInfo from "@/components/user/transactions/TransactionStatusInfo";
import TransactionPaymentInfo from "@/components/user/transactions/TransactionPaymentInfo";
import TransactionItemsInfo from "@/components/user/transactions/TransactionItemsInfo";

const TransactionAdminDetail = ({
  transaction,
}: {
  transaction: TransactionWithAdditionalStatus;
}) => {
  return (
    <div>
      <div className="mt-4">
        <TransactionStatusInfo transaction={transaction} />
      </div>
      <div className="mt-4">
        <TransactionAdminAction transaction={transaction} />
      </div>
      <div className="mt-4">
        <TransactionPaymentInfo
          disableUplaod
          hideReminder
          transaction={transaction}
        />
      </div>
      <div className="mt-4">
        <TransactionItemsInfo transaction={transaction} />
      </div>
    </div>
  );
};

export default TransactionAdminDetail;
