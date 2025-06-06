import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const HomePopularDestinationListPlaceholder = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} shadow="sm">
          <CardBody>
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </CardBody>
          <CardFooter className="text-small justify-between flex flex-col items-start gap-2">
            <Skeleton className="h-10 w-3/4 rounded-lg" />
            <Skeleton className="h-7 w-1/2 rounded-lg" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HomePopularDestinationListPlaceholder;
