import React from "react";

import { convertToTransactionAdditionalStatus } from "@/lib/convertToTransactionWithExpired";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Transaction } from "@/types/transaction.type";
import AdminDashboardClient from "@/components/admin/dashboard/AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard",
};

const AdminDashboardPage = async () => {
  const response = await fetchApiFromServer("/all-transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const transactions = (await response.json()).data as Transaction[];

  const transactionsWithAdditonalStatus = transactions.map(
    convertToTransactionAdditionalStatus
  );

  const pendingTransactionCount = transactionsWithAdditonalStatus.filter(
    (transaction) => transaction.status === "pending"
  ).length;
  const waitingConfirmationTransactionCount =
    transactionsWithAdditonalStatus.filter(
      (transaction) => transaction.status === "waiting_confirmation"
    ).length;
  const expiredTransactionCount = transactionsWithAdditonalStatus.filter(
    (transaction) => transaction.status === "expired"
  ).length;
  const cancelledTransactionCount = transactionsWithAdditonalStatus.filter(
    (transaction) => transaction.status === "cancelled"
  ).length;
  const successTransactionCount = transactionsWithAdditonalStatus.filter(
    (transaction) => transaction.status === "success"
  ).length;
  const failedTransactionCount = transactionsWithAdditonalStatus.filter(
    (transaction) => transaction.status === "failed"
  ).length;

  const recentTransactions = transactionsWithAdditonalStatus
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <AdminDashboardClient
      cancelledTransactionCount={cancelledTransactionCount}
      expiredTransactionCount={expiredTransactionCount}
      failedTransactionCount={failedTransactionCount}
      pendingTransactionCount={pendingTransactionCount}
      recentTransactions={recentTransactions}
      successTransactionCount={successTransactionCount}
      waitingConfirmationTransactionCount={waitingConfirmationTransactionCount}
    />
  );
};

export default AdminDashboardPage;
