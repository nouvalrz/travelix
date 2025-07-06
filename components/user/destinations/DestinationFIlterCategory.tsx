import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { RadioGroup, Radio } from "@heroui/radio";
import { RotateCcw, Loader2 } from "lucide-react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import React from "react";

import { useDestinationsStore } from "@/lib/store/useDestinationsStore";

const DestinationFilterCategory = () => {
  const {
    setCategorySelected,
    categoriesLoading,
    categorySelected,
    categories,
  } = useDestinationsStore();

  return (
    <Card shadow="sm">
      <CardBody>
        <div className="flex justify-between items-start">
          <p className="font-medium">Filter by Category</p>
          <Button
            isIconOnly
            aria-label="reset category to default"
            size="sm"
            variant="light"
            onPress={() => setCategorySelected("")}
          >
            <RotateCcw className="text-gray-600 size-5" />
          </Button>
        </div>
        <ScrollShadow className="h-[290px] mt-2 " size={80}>
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
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};

export default DestinationFilterCategory;
