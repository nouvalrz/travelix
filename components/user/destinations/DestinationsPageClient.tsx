"use client";

import React, { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { RadioGroup, Radio } from "@heroui/radio";
import { Loader2, RotateCcw } from "lucide-react";
import { Slider } from "@heroui/slider";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";

import DestinationsToolbar from "./DestinationsToolbar";
import DestinationCard from "./DestinationCard";

import { Destination } from "@/types/destination.type";
import {
  DestinationSorts,
  useDestinationsStore,
} from "@/lib/store/useDestinationsStore";

const DestinationsPageClient = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  const {
    sortSelected,
    setSortSelected,
    searchKeyword,
    setDestinations,
    categoriesLoading,
    fetchCategory,
    categories,
    categorySelected,
    setCategorySelected,
    setMinPriceSelected,
    setMaxPriceSelected,
    minPriceSelected,
    maxPriceSelected,
    resetPriceSelected,
  } = useDestinationsStore();

  useEffect(() => {
    setDestinations(destinations);
  }, [destinations, setDestinations]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <div className="relative">
      <DestinationsToolbar />
      <div className="flex flex-row gap-8 container mx-auto py-8 relative items-start">
        <div className="w-full max-w-72 sticky top-40">
          <Card shadow="sm">
            <CardBody>
              <div className="flex justify-between items-start">
                <p className="font-medium">Filter by Category</p>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => setCategorySelected("")}
                >
                  <RotateCcw className="text-gray-600 size-5" />
                </Button>
              </div>
              <div className="h-[300px] overflow-y-scroll mt-2">
                {categoriesLoading ? (
                  <Loader2 className="animate-spin text-gray-600 size-5 mx-auto" />
                ) : (
                  <RadioGroup
                    value={categorySelected}
                    onValueChange={setCategorySelected}
                  >
                    <Radio size="sm" value="">
                      All
                    </Radio>
                    {categories.map((category) => (
                      <Radio key={category.id} size="sm" value={category.id}>
                        {category.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </CardBody>
          </Card>
          <Card className="mt-4" shadow="sm">
            <CardBody>
              <div className="flex justify-between items-start">
                <p className="font-medium">Filter by Price Range</p>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={resetPriceSelected}
                >
                  <RotateCcw className="text-gray-600 size-5" />
                </Button>
              </div>
              <Slider
                showTooltip
                className="w-full mt-2"
                defaultValue={[0, 5_000_000]}
                formatOptions={{ style: "currency", currency: "IDR" }}
                label="Price Range"
                maxValue={5_000_000}
                minValue={0}
                renderLabel={() => null}
                renderValue={({ children }) => (
                  <p className="text-sm">
                    {children}
                    {maxPriceSelected === 5_000_000 ? " +" : ""}
                  </p>
                )}
                size="sm"
                step={100_000}
                value={[minPriceSelected, maxPriceSelected]}
                onChange={(value) => {
                  const range = value as number[];

                  setMinPriceSelected(range[0]);
                  setMaxPriceSelected(range[1]);
                }}
              />
            </CardBody>
          </Card>
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
            <div className="flex gap-4 items-center">
              <p className="font-medium">Sort by</p>
              <Select
                className="w-52"
                selectedKeys={new Set([sortSelected])}
                onSelectionChange={(value) => {
                  setSortSelected(value.currentKey as DestinationSorts);
                }}
              >
                {Object.values(DestinationSorts).map((sort) => (
                  <SelectItem key={sort}>{sort}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPageClient;
