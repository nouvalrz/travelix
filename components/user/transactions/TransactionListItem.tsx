import { Card, CardBody, CardHeader } from "@heroui/card";
import React from "react";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import clsx from "clsx";
import { Info } from "lucide-react";

import TransactionStatusChip from "./TransactionStatusChip";

import { Transaction } from "@/types/transaction.type";
import { formatDateTime } from "@/lib/formatDate";
import { formatRupiah } from "@/lib/formatRupiah";

const TransactionListItem = ({ transaction }: { transaction: Transaction }) => {
  const totalPrice = transaction.transaction_items.reduce(
    (acc, item) => acc + item.quantity * (item.price_discount ?? item.price),
    0
  );

  return (
    <Card key={transaction.id} shadow="sm">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-5 items-center">
            <p className="font-semibold">{transaction.invoiceId}</p>
            <p className="text-sm">{formatDateTime(transaction.createdAt)}</p>
          </div>
          <TransactionStatusChip status={transaction.status} />
        </div>
      </CardHeader>
      <hr />
      <CardBody>
        <div>
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                alt={transaction.transaction_items[0].title}
                className="w-16 h-16 rounded-lg object-cover"
                classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                fallbackSrc="/images/fallback-image.jpg"
                src={transaction.transaction_items[0].imageUrls[0]}
              />
              <div>
                <p className="font-medium line-clamp-1">
                  {transaction.transaction_items[0].title}
                </p>
                {transaction.transaction_items.length > 1 && (
                  <p className="text-sm">
                    +{transaction.transaction_items.length - 1} items
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm ">Total Price</p>
              <p className="font-semibold text-red-600 ">
                {formatRupiah(totalPrice)}
              </p>
            </div>
          </div>
          <div
            className={clsx(
              "flex items-end gap-2 mt-2",
              transaction.status === "pending"
                ? "justify-between"
                : "justify-end"
            )}
          >
            {transaction.status === "pending" && (
              <div className="flex gap-2 text-gray-600 items-center">
                <Info className="size-4 " />
                <p className="text-sm ">
                  Please pay before{" "}
                  <span className="underline">
                    {formatDateTime(transaction.expiredDate)}
                  </span>
                </p>
              </div>
            )}
            <Button color="primary" size="md">
              See Detail
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionListItem;
