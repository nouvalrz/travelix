import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const HomeCategoryListPlaceholder = () => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto justify-start py-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          disableRipple
          isPressable
          className="w-[200px] flex-shrink-0"
        >
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
