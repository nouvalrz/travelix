"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { ReceiptText, UserRound, DoorOpen } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import { useDisclosure } from "@heroui/modal";

import { AuthUserType } from "@/types/authUser.type";
import LogoutModal from "@/components/LogoutModal";

const MeSidebarClient = ({ authUser }: { authUser: AuthUserType }) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card shadow="sm">
        <CardBody>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Avatar
                  isBordered
                  className="w-12 h-12"
                  color="primary"
                  src={authUser.profilePictureUrl}
                />
                <div>
                  <p>{authUser?.name}</p>
                  <Chip
                    className="capitalize mt-1"
                    color={authUser?.role === "admin" ? "danger" : "primary"}
                  >
                    {authUser?.role}
                  </Chip>
                </div>
              </div>
              <div className="lg:hidden block">
                <Button
                  className="justify-start"
                  color="danger"
                  startContent={<DoorOpen className="size-5" />}
                  variant="light"
                  onPress={onOpen}
                >
                  Logout
                </Button>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-1">
              <Button
                as={Link}
                className="justify-start"
                href="/me"
                startContent={<UserRound className="size-5" />}
                variant={pathname === "/me" ? "flat" : "light"}
              >
                Profile
              </Button>
              <Button
                as={Link}
                className="justify-start"
                href="/me/transactions"
                startContent={<ReceiptText className="size-5" />}
                variant={pathname === "/me/transactions" ? "flat" : "light"}
              >
                Transactions
              </Button>
            </div>
            <hr className="lg:block hidden my-4" />
            <div className="lg:block hidden">
              <Button
                className="justify-start"
                color="danger"
                startContent={<DoorOpen className="size-5" />}
                variant="light"
                onPress={onOpen}
              >
                Logout
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <LogoutModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default MeSidebarClient;
