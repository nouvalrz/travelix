import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Slider } from "@heroui/slider";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { useDestinationsStore } from "@/lib/store/useDestinationsStore";

const DestinationFilterPrice = () => {
  const [sliderKey, setSliderKey] = useState<number>(0);
  const { setMaxPriceSelected, setMinPriceSelected, maxPriceSelected } =
    useDestinationsStore();

  const handleReset = () => {
    setSliderKey((prev) => prev + 1);
    setMinPriceSelected(0);
    setMaxPriceSelected(5_000_000);
  };

  return (
    <Card className="mt-4" shadow="sm">
      <CardBody>
        <div className="flex justify-between items-start">
          <p className="font-medium">Filter by Price Range</p>
          <Button isIconOnly size="sm" variant="light" onPress={handleReset}>
            <RotateCcw className="text-gray-600 size-5" />
          </Button>
        </div>
        <Slider
          key={sliderKey}
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
          onChangeEnd={(value) => {
            const range = value as number[];

            setMinPriceSelected(range[0]);
            setMaxPriceSelected(range[1]);
          }}
        />
      </CardBody>
    </Card>
  );
};

export default DestinationFilterPrice;
