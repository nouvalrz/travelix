import { TransactionPaymentMethod } from "./transactionPaymentMethod.type";
import { TransactionItem } from "./transactionItem.type";

export type TransactionStatus = "pending" | "success" | "cancelled" | "failed";

export type Transaction = {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId: string;
  status: TransactionStatus;
  totalAmount: number;
  proofPaymentUrl: any;
  orderDate: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
  payment_method: TransactionPaymentMethod;
  transaction_items: TransactionItem[];
};
