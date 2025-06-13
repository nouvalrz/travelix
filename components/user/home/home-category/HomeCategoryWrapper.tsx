import { Suspense } from "react";
import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import HomeCategoryList from "./HomeCategoryList";
import HomeCategoryListPlaceholder from "./HomeCategoryListPlaceholder";

const HomeCategoryWrapper = () => {
  return (
    <div className="px-4 pb-12">
      <div className="container mx-auto ">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Category</h2>
            <p className="mt-2">
              Find the perfect trip style that suits your next adventure.
            </p>
          </div>
          <Button
            as={Link}
            color="primary"
            endContent={<ChevronRight className="size-5" />}
            href="/categories"
            variant="light"
          >
            See All
          </Button>
        </div>
        <Suspense fallback={<HomeCategoryListPlaceholder />}>
          <HomeCategoryList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeCategoryWrapper;
