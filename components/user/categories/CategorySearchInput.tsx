"use client";

import { Input } from "@heroui/input";
import { Search } from "lucide-react";

import { useCategoriesStore } from "@/lib/store/useCategoriesStore";

const CategorySearchInput = () => {
  const { searchKeyword, setSearchKeyword } = useCategoriesStore();

  return (
    <Input
      isClearable
      className="mt-6"
      placeholder="Search category..."
      startContent={<Search className="size-5 text-gray-600" />}
      value={searchKeyword}
      onClear={() => setSearchKeyword("")}
      onValueChange={(value) => setSearchKeyword(value)}
    />
  );
};

export default CategorySearchInput;
