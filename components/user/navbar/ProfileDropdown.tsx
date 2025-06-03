import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { LayoutDashboard, User, DoorOpen } from "lucide-react";
import React from "react";
import Link from "next/link";

import { LoggedContentProps } from "./NavbarClient";

const ProfileDropdown = ({
  authUser,
  onModalLogoutOpen,
}: LoggedContentProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          className="text-base font-medium gap-3"
          variant="light"
        >
          <Avatar
            isBordered
            classNames={{ base: "size-6" }}
            color="primary"
            src={authUser.profilePictureUrl}
          />
          {authUser.name.split(" ")[0]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {authUser.role === "admin" ? (
          <DropdownItem
            key="admin"
            startContent={<LayoutDashboard className="size-5" />}
          >
            <Link href="/admin">Admin Dashboard</Link>
          </DropdownItem>
        ) : null}
        <DropdownItem key="profile" startContent={<User className="size-5" />}>
          <Link href="/profile">Profile</Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<DoorOpen className="size-5" />}
          onClick={onModalLogoutOpen}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
