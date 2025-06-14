import { Chip } from "@heroui/chip";
import React from "react";

import { TransactionStatus } from "@/types/transaction.type";

const colorByStatus: Record<
  TransactionStatus,
  "primary" | "success" | "warning" | "danger"
> = {
  pending: "primary",
  success: "success",
  cancelled: "warning",
  failed: "danger",
};

const TransactionStatusChip = ({ status }: { status: TransactionStatus }) => {
  return (
    <Chip
      className="capitalize"
      color={colorByStatus[status]}
      size="md"
      variant="flat"
    >
      {status}
    </Chip>
  );
};

export default TransactionStatusChip;
