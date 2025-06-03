export type TransactionItem = {
  imageUrls: string[];
  id: string;
  transactionId: string;
  title: string;
  description: string;
  price: number;
  price_discount?: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
