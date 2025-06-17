import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const DestinationCardPlaceholder = () => {
  return (
    <Card shadow="sm">
      <CardBody>
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </CardBody>
      <CardFooter className="text-small justify-between flex flex-col items-start gap-2">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-7 w-1/2 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

export default DestinationCardPlaceholder;
