"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { DoorOpen, LayoutDashboard, ShoppingCart, User } from "lucide-react";
import { Badge } from "@heroui/badge";

import { TravelixLogoHorizontal } from "../../icons";
import CartsModal from "../carts/CartsModal";

import LogoutModal from "@/components/LogoutModal";
import { AuthUserType } from "@/types/authUser.type";
import { useCartsStore } from "@/lib/store/useCartsStore";

type NavbarClientProps = {
  authUser: AuthUserType | null;
};

const GuestContent = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/register">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

type LoggedContentProps = {
  authUser: AuthUserType;
  onModalLogoutOpen: () => void;
};

const LoggedContent = ({ authUser, onModalLogoutOpen }: LoggedContentProps) => {
  const { isLoading, totalCarts, setCartsModalOpen } = useCartsStore();

  return (
    <NavbarContent justify="end">
      <CartsModal />
      <NavbarItem>
        {isLoading ? (
          <Button
            isIconOnly
            variant="light"
            onClick={() => setCartsModalOpen(true)}
          >
            <ShoppingCart className="size-6" />
          </Button>
        ) : (
          <Badge color="primary" content={totalCarts()} shape="circle">
            <Button
              isIconOnly
              variant="light"
              onClick={() => setCartsModalOpen(true)}
            >
              <ShoppingCart className="size-6" />
            </Button>
          </Badge>
        )}
      </NavbarItem>
      <NavbarItem>
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
            <DropdownItem
              key="profile"
              startContent={<User className="size-5" />}
            >
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
      </NavbarItem>
    </NavbarContent>
  );
};

const NavbarClient = ({ authUser }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [modalLogout, setModalLogout] = useState<boolean>(false);
  const { fetchCarts } = useCartsStore();

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <Navbar
      isBordered
      className="font-medium"
      classNames={{ wrapper: "max-w-[1300px]" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <TravelixLogoHorizontal width={120} />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link href="#">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Destinations</Link>
        </NavbarItem>
        <NavbarItem>
          <Link aria-current="page" href="#">
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Promos
          </Link>
        </NavbarItem>
      </NavbarContent>
      <LogoutModal isOpen={modalLogout} onOpenChange={setModalLogout} />
      {authUser ? (
        <LoggedContent
          authUser={authUser}
          onModalLogoutOpen={() => setModalLogout(true)}
        />
      ) : (
        <GuestContent />
      )}
    </Navbar>
  );
};

export default NavbarClient;
