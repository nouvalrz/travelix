import { TransactionStatusWithAdditional } from "@/lib/store/useTransactiosListStore";

export const fetchTransactions = async () => {
  const response = await fetch("/api/proxy/my-transactions", {
    method: "GET",
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchCreateTransaction = async (
  cartIds: string[],
  paymentMethodId: string
) => {
  const response = await fetch("/api/proxy/create-transaction", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartIds, paymentMethodId }),
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchUpdatePaymentProof = async (
  transactionId: string,
  proofUrl: string
) => {
  const response = await fetch(
    "/api/proxy/update-transaction-proof-payment/" + transactionId,
    {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proofPaymentUrl: proofUrl }),
    }
  );

  const responseData = await response.json();

  return responseData;
};

export const fetchUpdateTransactionStatus = async (
  transactionId: string,
  newStatus: TransactionStatusWithAdditional
) => {
  const response = await fetch(
    "/api/proxy/update-transaction-status/" + transactionId,
    {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }
  );

  const responseData = await response.json();

  return responseData;
};
