import { Chip } from "@heroui/chip";
import React from "react";

import { UserRole } from "@/types/user.type";

const RoleChip = ({ role }: { role: UserRole | "" }) => {
  return (
    <Chip
      className="capitalize"
      color={
        role === "admin" ? "danger" : role === "user" ? "primary" : "default"
      }
      size="md"
    >
      {role || "All Role"}
    </Chip>
  );
};

export default RoleChip;
