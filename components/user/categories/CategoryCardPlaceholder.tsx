import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import clsx from "clsx";
import React from "react";

const CategoryCardPlaceholder = ({ className }: { className?: string }) => {
  return (
    <Card disableRipple isPressable className={clsx(className)} shadow="sm">
      <CardBody className="overflow-visible p-0">
        <Skeleton className="w-full h-[140px]" />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <Skeleton className="w-4/5 rounded-lg h-5" />
      </CardFooter>
    </Card>
  );
};

export default CategoryCardPlaceholder;
