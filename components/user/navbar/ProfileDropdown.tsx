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
import { Chip } from "@heroui/chip";

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
          <p className="line-clamp-1">{authUser.name.split(" ")[0]}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile-summary" isReadOnly>
          <p className="font-medium">{authUser.name}</p>
          <p>{authUser.email}</p>
          <Chip
            className="capitalize mt-2"
            color={authUser.role === "admin" ? "danger" : "primary"}
          >
            {authUser.role}
          </Chip>
        </DropdownItem>
        {authUser.role === "admin" ? (
          <DropdownItem
            key="admin"
            startContent={<LayoutDashboard className="size-5" />}
          >
            <Link href="/admin">Admin Dashboard</Link>
          </DropdownItem>
        ) : null}
        <DropdownItem key="me" startContent={<User className="size-5" />}>
          <Link href="/me">Profile</Link>
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
