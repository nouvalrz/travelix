import { PaymentMethod } from "./paymentMethod.type";
import { TransactionItem } from "./transactionItem.type";

export type Transaction = {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId: string;
  status: string;
  totalAmount: number;
  proofPaymentUrl: any;
  orderDate: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
  payment_method: PaymentMethod;
  transaction_items: TransactionItem[];
};
