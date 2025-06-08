"use client";

import React, { useEffect } from "react";

import DestinationsToolbar from "./DestinationsToolbar";
import DestinationPaginatedList from "./DestinationPaginatedList";
import DestinationFilterCategory from "./DestinationFIlterCategory";
import DestinationFilterPrice from "./DestinationFilterPrice";
import DestinationSortSelect from "./DestinationSortSelect";

import { Destination } from "@/types/destination.type";
import { useDestinationsStore } from "@/lib/store/useDestinationsStore";
import { useDestinationQuery } from "@/lib/hooks/useDestinationsQuery";

const DestinationsPageClient = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  const {
    sortSelected,
    setSortSelected,
    searchKeyword,
    initDestinations: setDestinations,
    fetchCategory,
  } = useDestinationsStore();

  useEffect(() => {
    setDestinations(destinations);
  }, [destinations, setDestinations]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useDestinationQuery();

  return (
    <div className="relative">
      <DestinationsToolbar />
      <div className="flex flex-row gap-8 container mx-auto py-8 relative items-start">
        <div className="w-full max-w-72 sticky top-24">
          <DestinationFilterCategory />
          <DestinationFilterPrice />
        </div>
        <div className="flex-grow ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Showing{" "}
              {searchKeyword ? (
                <span className="text-primary">{searchKeyword}</span>
              ) : (
                "all"
              )}{" "}
              destinations
            </h2>
            <DestinationSortSelect />
          </div>
          <DestinationPaginatedList />
        </div>
      </div>
    </div>
  );
};

export default DestinationsPageClient;
