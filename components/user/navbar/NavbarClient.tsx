"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { ReceiptText } from "lucide-react";
import { Badge } from "@heroui/badge";
import clsx from "clsx";

import { TravelixLogoHorizontal } from "../../icons";
import CartsPopover from "../carts/CartsPopover";

import ProfileDropdown from "./ProfileDropdown";

import LogoutModal from "@/components/LogoutModal";
import { AuthUserType } from "@/types/authUser.type";
import { useCartsStore } from "@/lib/store/useCartsStore";
import { useTransactionsStore } from "@/lib/store/useTransactionsStore";
import { useNavbarPosition } from "@/lib/hooks/useNavbarPosition";

type NavbarClientProps = {
  authUser: AuthUserType | null;
};

const navigations = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Destinations",
    href: "/destinations",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Promos",
    href: "/promos",
  },
];

const GuestContent = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="flex">
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

export type LoggedContentProps = {
  authUser: AuthUserType;
  onModalLogoutOpen: () => void;
};

const LoggedContent = ({ authUser, onModalLogoutOpen }: LoggedContentProps) => {
  const { cartsLoading, totalCarts, carts, fetchCarts } = useCartsStore();
  const { transactionsLoading, totalTransactions, fetchTransactions } =
    useTransactionsStore();

  useEffect(() => {
    fetchCarts();
    fetchTransactions();
  }, []);

  return (
    <NavbarContent className="gap-2" justify="end">
      <NavbarItem>
        <Badge
          className={clsx({ "animate-pulse": cartsLoading })}
          color="primary"
          content={cartsLoading ? " " : totalCarts()}
          isInvisible={!cartsLoading && totalCarts() === 0}
          shape="circle"
        >
          {/* <CartsDropdown carts={carts} /> */}
          <CartsPopover carts={carts} />
        </Badge>
      </NavbarItem>
      <NavbarItem>
        <Badge
          className={clsx({ "animate-pulse": cartsLoading })}
          color="primary"
          content={transactionsLoading ? " " : totalTransactions()}
          isInvisible={!transactionsLoading && totalTransactions() === 0}
          shape="circle"
        >
          <Link href="/transactions">
            <Button isIconOnly variant="light">
              <ReceiptText className="size-6" />
            </Button>
          </Link>
        </Badge>
      </NavbarItem>
      <NavbarItem>
        <ProfileDropdown
          authUser={authUser}
          onModalLogoutOpen={onModalLogoutOpen}
        />
      </NavbarItem>
    </NavbarContent>
  );
};

const NavbarClient = ({ authUser }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [modalLogout, setModalLogout] = useState<boolean>(false);
  const position = useNavbarPosition();

  return (
    <Navbar
      isBordered
      className="font-medium"
      maxWidth="xl"
      position={position}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <TravelixLogoHorizontal width={120} />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {navigations.map((navigation, index) => (
          <NavbarItem key={index}>
            <Link href={navigation.href}>{navigation.title}</Link>
          </NavbarItem>
        ))}
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
      <NavbarMenu>
        {navigations.map((navigation, index) => (
          <NavbarMenuItem key={index} className="text-base">
            <Link href={navigation.href}>{navigation.title}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarClient;
