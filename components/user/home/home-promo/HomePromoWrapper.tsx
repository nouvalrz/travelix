import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

import HomePromoList from "./HomePromoList";

const HomePromoWrapper = () => {
  return (
    <div className="px-4 pb-12">
      <div className="container mx-auto ">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Promo & Offer</h2>
            <p className="mt-2">
              Save more and explore the world with our special promos.
            </p>
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
          <HomePromoList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePromoWrapper;
