import { Select, SelectItem } from "@heroui/select";
import React from "react";

import {
  DestinationSorts,
  useDestinationsStore,
} from "@/lib/store/useDestinationsStore";

const DestinationSortSelect = () => {
  const { setSortSelected, sortSelected } = useDestinationsStore();

  return (
    <div className="flex gap-4 items-center">
      <p className="text-sm md:text-base font-medium flex-shrink-0">Sort by</p>
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
  );
};

export default DestinationSortSelect;
