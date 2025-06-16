import { Card, CardBody, CardHeader } from "@heroui/card";
import React from "react";
import { Image } from "@heroui/image";

import { TransactionWithAdditionalStatus } from "@/lib/store/useTransactiosListStore";
import { formatRupiah } from "@/lib/formatRupiah";

const TransactionItemsInfo = ({
  transaction,
}: {
  transaction: TransactionWithAdditionalStatus;
}) => {
  const totalPrice = transaction.transaction_items.reduce(
    (acc, item) => acc + item.quantity * (item.price_discount ?? item.price),
    0
  );

  return (
    <Card shadow="sm">
      <CardHeader>
        <div>
          <p className="font-medium">
            Transaction Items ({transaction.transaction_items.length})
          </p>
        </div>
      </CardHeader>
      <hr />
      <CardBody>
        <div>
          <div className="flex flex-col gap-3">
            {transaction.transaction_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    alt={item.title}
                    className="w-16 h-16 object-cover"
                    classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                    fallbackSrc="/images/fallback-image.jpg"
                    src={item.imageUrls[0]}
                  />
                  <div>
                    <p>{item.title}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm">
                    {item.quantity} x{" "}
                    {formatRupiah(item.price_discount || item.price)}
                  </p>
                  <p className="mt-1 font-medium">
                    {formatRupiah(
                      item.quantity * (item.price_discount ?? item.price)
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="flex justify-end">
            <div className="flex flex-col items-end">
              <p>Total Price</p>
              <p className="text-red-600 font-semibold">
                {formatRupiah(totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionItemsInfo;
