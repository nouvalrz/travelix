"use client";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import React from "react";

import { usePromosStore } from "@/lib/store/usePromosStore";

const PromoSearchInput = () => {
  const { searchKeyword, setSearchKeyword } = usePromosStore();

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

export default PromoSearchInput;
