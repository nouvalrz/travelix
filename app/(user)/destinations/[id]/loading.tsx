import { Skeleton } from "@heroui/skeleton";

const loading = () => {
  return (
    <div className="px-4 py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 grid-rows-3 lg:grid-rows-2 gap-4 w-full h-[300px] mt-4 ">
          <Skeleton className="rounded-lg  col-span-4 lg:col-span-2 row-span-2 lg:row-span-2" />
          <Skeleton className="rounded-lg" />
          <Skeleton className="rounded-lg" />
          <Skeleton className="rounded-lg" />
          <Skeleton className="rounded-lg" />
        </div>
        <div className="mt-8">
          <Skeleton className="rounded-lg w-24 h-8" />
          <Skeleton className="rounded-lg w-32 h-8 mt-2" />

          <Skeleton className="rounded-lg w-full h-12 mt-8" />
          <Skeleton className="rounded-lg w-full h-44 mt-4" />
          <Skeleton className="rounded-lg w-full h-44 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default loading;
