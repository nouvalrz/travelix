import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const HomePromoListPlaceholder = () => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto py-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          isFooterBlurred
          className=" flex-shrink-0 w-[320px] relative"
        >
          <CardBody>
            <Skeleton className="h-[220px] w-full rounded-lg" />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default HomePromoListPlaceholder;
