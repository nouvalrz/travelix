import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import clsx from "clsx";
import React from "react";

const PromoCardPlaceholder = ({ className }: { className?: string }) => {
  return (
    <Card className={clsx(className)} shadow="sm">
      <CardBody>
        <Skeleton className="h-[180px] w-full rounded-lg" />
        <Skeleton className="h-[28px] w-full rounded-lg mt-4" />
      </CardBody>
    </Card>
  );
};

export default PromoCardPlaceholder;
