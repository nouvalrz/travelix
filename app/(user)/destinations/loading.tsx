import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

import DestinationCardPlaceholder from "@/components/user/destinations/DestinationCardPlaceholder";

const loading = () => {
  return (
    <div className="px-4 py-12 min-h-[1290px]">
      <div className="container mx-auto">
        <div className="flex lg:flex-row gap-8">
          <div className="w-full max-w-72 lg:block hidden">
            <Card shadow="sm">
              <CardBody>
                <Skeleton className="rounded-lg h-12 w-full" />
                <Skeleton className="rounded-lg h-6 w-full mt-6" />
                <Skeleton className="rounded-lg h-6 w-full mt-2" />
              </CardBody>
            </Card>

            <Card className="mt-12" shadow="sm">
              <CardBody>
                <Skeleton className="rounded-lg h-12 w-full" />
                <Skeleton className="rounded-lg h-6 w-full mt-6" />
                <Skeleton className="rounded-lg h-6 w-full mt-2" />
              </CardBody>
            </Card>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3  gap-4 flex-grow">
            {Array.from({ length: 9 }).map((_, index) => (
              <DestinationCardPlaceholder key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
