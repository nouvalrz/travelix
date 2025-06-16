import { Chip } from "@heroui/chip";
import React from "react";

import { TransactionStatusWithAdditional } from "@/lib/store/useTransactiosListStore";

const colorByStatus: Record<
  TransactionStatusWithAdditional,
  "primary" | "success" | "warning" | "danger"
> = {
  pending: "primary",
  success: "success",
  cancelled: "warning",
  failed: "danger",
  expired: "warning",
  waiting_confirmation: "warning",
};

const TransactionStatusChip = ({
  status,
}: {
  status: TransactionStatusWithAdditional;
}) => {
  return (
    <Chip
      className="capitalize"
      color={colorByStatus[status]}
      size="md"
      variant="flat"
    >
      {status === "waiting_confirmation" ? "Waiting for Confirmation" : status}
    </Chip>
  );
};

export default TransactionStatusChip;
