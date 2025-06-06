import { Suspense } from "react";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import HomePopularDestinationList from "./HomePopularDestinationList";
import HomePopularDestinationListPlaceholder from "./HomePopularDestinationListPlaceholder";

const HomePopularDestinationWrapper = () => {
  return (
    <div className="px-4 pb-12">
      <div className="container mx-auto ">
        <div>
          <h2 className="text-3xl font-bold">Popular Destinations</h2>
          <p className="mt-2">Top travel spots handpicked just for you.</p>
        </div>

        <Suspense fallback={<HomePopularDestinationListPlaceholder />}>
          <HomePopularDestinationList />
        </Suspense>

        <div className="flex justify-center">
          <Link href="/destinations">
            <Button
              disableRipple
              color="primary"
              endContent={<ArrowRight className="size-5" />}
              variant="flat"
            >
              See More Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePopularDestinationWrapper;
