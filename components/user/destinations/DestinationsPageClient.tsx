"use client";

import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import DestinationsToolbar from "./DestinationsToolbar";
import DestinationPaginatedList from "./DestinationPaginatedList";
import DestinationFilterCategory from "./DestinationFIlterCategory";
import DestinationFilterPrice from "./DestinationFilterPrice";
import DestinationSortSelect from "./DestinationSortSelect";
import DestinationQueryMobile from "./DestinationQueryMobile";

import { Destination } from "@/types/destination.type";
import { useDestinationsStore } from "@/lib/store/useDestinationsStore";
import { useDestinationQuery } from "@/lib/hooks/useDestinationsQuery";
import {
  useDestinationQueryUrlBindingFromStore,
  useDestinationQueryUrlBindingToStore,
} from "@/lib/hooks/useDestinationQueryUrlBinding";

const DestinationsPageClient = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const {
    searchKeyword,
    initDestinations: setDestinations,
    fetchCategory,
    categorySelected,
    setCategorySelected,
    categories,
    destinationQueryResults,
  } = useDestinationsStore();

  useEffect(() => {
    setDestinations(destinations);
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    setCategorySelected("");
  }, []);

  useDestinationQuery();
  useDestinationQueryUrlBindingToStore();
  useDestinationQueryUrlBindingFromStore();

  return (
    <>
      <div className="relative">
        <DestinationsToolbar />
        <div className="px-4">
          <div className="flex flex-row gap-8 container mx-auto py-8 relative items-start">
            {!isMobile && (
              <div className="w-full max-w-72 sticky top-24 lg:block hidden">
                <DestinationFilterCategory />
                <DestinationFilterPrice />
              </div>
            )}
            <div className="flex-grow ">
              <div className="flex justify-between items-end flex-wrap gap-2 lg:gap-0">
                <h2 className="text-lg md:text-xl font-semibold">
                  Showing{" "}
                  {searchKeyword ? (
                    <span className="text-primary">{searchKeyword}</span>
                  ) : (
                    "all"
                  )}{" "}
                  {categorySelected ? (
                    <>
                      in{" "}
                      <span className="text-primary">
                        {
                          categories.find((cat) => cat.id === categorySelected)
                            ?.name
                        }
                      </span>
                    </>
                  ) : (
                    "destinations"
                  )}
                </h2>
                <DestinationSortSelect />
              </div>
              <DestinationPaginatedList />
            </div>
          </div>
        </div>
      </div>
      {isMobile && <DestinationQueryMobile />}
    </>
  );
};

export default DestinationsPageClient;
