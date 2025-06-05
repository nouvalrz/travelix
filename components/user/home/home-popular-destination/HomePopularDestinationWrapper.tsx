import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

import HomePopularDestinationList from "./HomePopularDestinationList";

const HomePopularDestinationWrapper = () => {
  return (
    <div className="px-4 pb-12">
      <div className="container mx-auto ">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <p className="mt-2">Top travel spots handpicked just for you.</p>
          </div>
          <Button
            color="primary"
            endContent={<ChevronRight className="size-5" />}
            variant="light"
          >
            See All
          </Button>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <HomePopularDestinationList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePopularDestinationWrapper;
