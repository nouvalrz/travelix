"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectedItems, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

import {
  TransactionStatusWithAdditional,
  TransactionWithAdditionalStatus,
} from "@/lib/store/useTransactiosListStore";
import TransactionStatusChip from "@/components/user/transactions/TransactionStatusChip";
import { fetchUpdateTransactionStatus } from "@/lib/data/client/transactions";
import { AppError } from "@/lib/appError";

type StatusOption = { value: TransactionStatusWithAdditional };

const statusValues: StatusOption[] = [
  { value: "success" },
  { value: "failed" },
];

const TransactionAdminAction = ({
  transaction,
}: {
  transaction: TransactionWithAdditionalStatus;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [statusSelected, setStatusSelected] =
    useState<TransactionStatusWithAdditional | null>(transaction.status);

  const handleUpdateStatus = async () => {
    if (!statusSelected) return;
    setLoading(true);
    try {
      await fetchUpdateTransactionStatus(transaction.id, statusSelected);
      addToast({
        color: "success",
        title: "Success",
        description: "Successfully update transaction status",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof AppError) {
        addToast({
          color: "danger",
          title: error.message,
          description: error.errors?.join(", "),
        });
      }
      if (error instanceof Error) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Card shadow="sm">
      <CardHeader>
        <div className="flex gap-3 items-center w-full">
          <p className="font-medium">Transaction Action</p>
        </div>
      </CardHeader>
      <hr />
      <CardBody>
        {["waiting_confirmation", "pending"].includes(transaction.status) ? (
          <div className="flex items-end gap-3">
            <div className="max-w-sm w-full">
              <Select
                classNames={{ value: "capitalize" }}
                items={statusValues}
                label="Update Status"
                labelPlacement="outside"
                maxListboxHeight={600}
                placeholder="Select new status"
                renderValue={(items: SelectedItems<StatusOption>) => {
                  return items.map((status) => (
                    <TransactionStatusChip
                      key={status.key}
                      status={status.data!.value!}
                    />
                  ));
                }}
                selectedKeys={new Set(statusSelected ? [statusSelected] : [])}
                onSelectionChange={(value) => {
                  setStatusSelected(
                    value.currentKey as TransactionStatusWithAdditional
                  );
                }}
              >
                {(item) => (
                  <SelectItem key={item.value}>
                    <TransactionStatusChip status={item.value} />
                  </SelectItem>
                )}
              </Select>
            </div>
            <Button
              color="primary"
              isDisabled={!statusSelected}
              isLoading={loading}
              onPress={handleUpdateStatus}
            >
              Update Status
            </Button>
          </div>
        ) : (
          <div>
            <p>
              Only Pending and Waiting for Confirmation status can be updated
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TransactionAdminAction;
