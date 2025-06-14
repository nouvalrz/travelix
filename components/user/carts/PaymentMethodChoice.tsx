import { RadioGroup, RadioGroupProps } from "@heroui/radio";
import { Image } from "@heroui/image";

import { CustomRadio } from "@/components/CustomRadio";
import { PaymentMethod } from "@/types/paymentMethod.type";

interface PaymentMethodChoiceProps extends RadioGroupProps {
  paymenyMethods: PaymentMethod[];
}

const PaymentMethodChoice = (props: PaymentMethodChoiceProps) => {
  return (
    <div>
      <RadioGroup
        className="text-sm text-primary-900 flex"
        classNames={{ label: "text-gray-900 text-base" }}
        color="secondary"
        label="Payment Method"
        {...props}
      >
        <div className="flex flex-col gap-3">
          {/* <CustomRadio
            key="admin"
            className="flex-1"
            color="secondary"
            value="user"
          >
            <span className="flex gap-2 items-center text-sm">
              <User className="size-5" /> User
            </span>
          </CustomRadio> */}

          {props.paymenyMethods.map((method) => (
            <CustomRadio
              key={method.name}
              className="flex-1"
              color="secondary"
              value={method.id}
            >
              <span className="flex gap-2 items-center text-sm">
                <Image
                  alt={method.name}
                  className="w-24 h-6 rounded-lg object-contain"
                  classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                  fallbackSrc="/images/fallback-image.jpg"
                  src={method.imageUrl}
                />{" "}
                {method.name}
              </span>
            </CustomRadio>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodChoice;
