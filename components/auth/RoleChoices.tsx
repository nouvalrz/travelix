import { RadioGroup, RadioGroupProps } from "@heroui/radio";
import { ShieldUser, User } from "lucide-react";

import { CustomRadio } from "../CustomRadio";

const RoleChoices = (props: RadioGroupProps) => {
  return (
    <div>
      <RadioGroup
        className="text-sm text-primary-900 flex"
        classNames={{ label: "text-primary-900" }}
        color="secondary"
        label="Role"
        {...props}
      >
        <div className="flex gap-3">
          <CustomRadio
            key="admin"
            className="flex-1"
            color="secondary"
            value="user"
          >
            <span className="flex gap-2 items-center text-sm">
              <User className="size-5" /> User
            </span>
          </CustomRadio>
          <CustomRadio
            key="user"
            className="flex-1"
            color="secondary"
            value="admin"
          >
            <span className="flex gap-2 items-center text-sm">
              <ShieldUser className="size-5" /> Admin
            </span>
          </CustomRadio>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RoleChoices;
