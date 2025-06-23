import { Card, CardBody, CardHeader } from "@heroui/card";
import React from "react";
import { Skeleton } from "@heroui/skeleton";

const TransactionListItemPlaceholder = () => {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <Card key={index} shadow="sm">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-6 w-8 rounded-lg" />
            </div>
          </CardHeader>
          <hr />
          <CardBody>
            <div className="flex items-start justify-between">
              <Skeleton className="w-36 h-16 rounded-lg" />

              <Skeleton className="w-24 h-16 rounded-lg" />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default TransactionListItemPlaceholder;
