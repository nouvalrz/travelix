import {
  TransactionStatusWithAdditional,
  TransactionWithAdditionalStatus,
} from "./store/useTransactiosListStore";

import { Transaction } from "@/types/transaction.type";

export const convertToTransactionAdditionalStatus = (
  transaction: Transaction
): TransactionWithAdditionalStatus => {
  const now = Date.now();
  const expiredDate = new Date(transaction.expiredDate).getTime();
  const isExpired = transaction.status === "pending" && now > expiredDate;
  const hasProof = !!transaction.proofPaymentUrl;

  let status: TransactionStatusWithAdditional = transaction.status;

  if (transaction.status === "pending") {
    if (isExpired && !hasProof) {
      status = "expired";
    } else if (hasProof) {
      status = "waiting_confirmation";
    }
  }

  return {
    ...transaction,
    status,
  } as TransactionWithAdditionalStatus;
};
