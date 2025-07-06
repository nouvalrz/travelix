import { Button } from "@heroui/button";
import { NumberInput, NumberInputProps } from "@heroui/number-input";
import { Plus, Minus } from "lucide-react";
import React, { useState } from "react";

const QuantityInput = (props: NumberInputProps) => {
  const min = props.minValue !== undefined ? Number(props.minValue) : 0;
  const max = props.maxValue !== undefined ? Number(props.maxValue) : undefined;
  const [value, setValue] = useState<number>(
    props.defaultValue ?? props.value ?? props.minValue ?? 1
  );

  const handleChange = (newVal: number) => {
    if (newVal < min) return;
    if (max !== undefined && newVal > max) return;

    setValue(newVal);
    props.onValueChange?.(newVal);
  };

  return (
    <NumberInput
      hideStepper
      classNames={{ input: "text-center" }}
      endContent={
        <Button
          isIconOnly
          aria-label="add one item"
          variant="light"
          onPress={() => handleChange(value + 1)}
        >
          <Plus className="size-4" />
        </Button>
      }
      startContent={
        <Button
          isIconOnly
          aria-label="remove one item"
          variant="light"
          onPress={() => handleChange(value - 1)}
        >
          <Minus className="size-4 cursor-pointer" />{" "}
        </Button>
      }
      value={value}
      onValueChange={handleChange}
      {...props}
    />
  );
};

export default QuantityInput;
