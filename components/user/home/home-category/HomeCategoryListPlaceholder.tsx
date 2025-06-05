import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const HomeCategoryListPlaceholder = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} disableRipple isPressable>
          <CardBody className="overflow-visible p-0">
            <Skeleton className="w-full h-[140px]" />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <Skeleton className="w-4/5 rounded-lg h-5" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HomeCategoryListPlaceholder;
