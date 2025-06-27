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
import {
  BadgePercent,
  House,
  Layers2,
  ReceiptText,
  Ticket,
} from "lucide-react";
import { Badge } from "@heroui/badge";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

// @ts-ignore
import { useRouter } from "nextjs-toploader/app";

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
    icon: <House className="size-5" />,
  },
  {
    title: "Destinations",
    href: "/destinations",
    icon: <Ticket className="size-5" />,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: <Layers2 className="size-5" />,
  },
  {
    title: "Promos",
    href: "/promos",
    icon: <BadgePercent className="size-5" />,
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
          <Button isIconOnly as={Link} href="/me/transactions" variant="light">
            <ReceiptText className="size-6" />
          </Button>
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
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [modalLogout, setModalLogout] = useState<boolean>(false);
  const position = useNavbarPosition();
  const isSmallMobile = useMediaQuery({ maxWidth: 639 });

  const handleMenuClick = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      isBordered
      className="font-medium"
      classNames={{
        menu: "bg-white",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-3",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
      isMenuOpen={isMenuOpen}
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
          <div className="w-[80px] md:w-[100px] lg:w-[120px]">
            <TravelixLogoHorizontal />
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {navigations.map((navigation, index) => (
          <NavbarItem key={index} isActive={pathname === navigation.href}>
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
            {/* <Link href={navigation.href} onClick={() => setIsMenuOpen(false)}>
              {navigation.title}
            </Link> */}
            <Button
              key={navigation.href}
              fullWidth
              className="justify-start"
              color={pathname === navigation.href ? "primary" : "default"}
              startContent={navigation.icon}
              variant={pathname === navigation.href ? "flat" : "light"}
              onPress={() => handleMenuClick(navigation.href)}
            >
              {navigation.title}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarClient;
