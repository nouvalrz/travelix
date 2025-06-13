import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

import HomePromoList from "./HomePromoList";
import HomePromoListPlaceholder from "./HomePromoListPlaceholder";

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
            as={Link}
            color="primary"
            endContent={<ChevronRight className="size-5" />}
            href="/promos"
            variant="light"
          >
            See All
          </Button>
        </div>
        <Suspense fallback={<HomePromoListPlaceholder />}>
          <HomePromoList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePromoWrapper;
