"use client";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  BadgePercent,
  DoorOpen,
  GalleryVertical,
  House,
  Layers2,
  LayoutDashboard,
  ReceiptText,
  Tickets,
  UserRound,
  Users,
} from "lucide-react";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useRouter } from "nextjs-toploader/app";

import { AuthUserType } from "@/types/authUser.type";
import { TravelixLogoHorizontal } from "@/components/icons";
import LogoutModal from "@/components/LogoutModal";

const adminNavigations = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: <ReceiptText className="size-5" />,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: <Layers2 className="size-5" />,
  },
  {
    title: "Destinations",
    href: "/admin/destinations",
    icon: <Tickets className="size-5" />,
  },
  {
    title: "Banners",
    href: "/admin/banners",
    icon: <GalleryVertical className="size-5" />,
  },
  {
    title: "Promos",
    href: "/admin/promos",
    icon: <BadgePercent className="size-5" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="size-5" />,
  },
  {
    title: "My Profile",
    href: "/admin/profile",
    icon: <UserRound className="size-5" />,
  },
];

const AdminNavbarMenus = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3">
      {adminNavigations.map((nav) => (
        <Button
          key={nav.href}
          as={Link}
          className="justify-start"
          href={nav.href}
          startContent={nav.icon}
          variant={pathname === nav.href ? "flat" : "light"}
        >
          {nav.title}
        </Button>
      ))}
    </div>
  );
};

const AdminNavbarDesktop = ({
  authUser,
  onLogoutPress,
}: {
  authUser: AuthUserType;
  onLogoutPress: () => void;
}) => {
  return (
    <div className="w-full">
      <Card
        fullWidth
        classNames={{ base: "rounded-l-none min-h-screen" }}
        shadow="sm"
      >
        <CardHeader>
          <div className="flex justify-center w-full">
            <TravelixLogoHorizontal width={100} />
          </div>
        </CardHeader>
        <CardBody>
          <div className="mt-4">
            <div className="flex gap-3 items-center">
              <Image
                className="w-12 h-12 object-cover rounded-full"
                src={authUser?.profilePictureUrl}
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
            <hr className="mt-4" />
            <div className=" mt-4">
              <AdminNavbarMenus />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div>
            <Button
              as={Link}
              color="primary"
              href="/"
              startContent={<House className="size-5" />}
              variant="light"
            >
              Back to Customer Home
            </Button>
            <Button
              color="danger"
              startContent={<DoorOpen className="size-5" />}
              variant="light"
              onPress={onLogoutPress}
            >
              Logout
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const AdminNavbarMobile = ({
  authUser,
  onLogoutPress,
}: {
  authUser: AuthUserType;
  onLogoutPress: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };

  return (
    <Navbar
      isBordered
      className="font-medium"
      isMenuOpen={menuOpen}
      maxWidth="xl"
      onMenuOpenChange={setMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <div className="flex gap-3 items-center">
            <TravelixLogoHorizontal width={120} />
            <Chip
              className="capitalize mt-1"
              color={authUser?.role === "admin" ? "danger" : "primary"}
            >
              {authUser?.role}
            </Chip>
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        <div className="mt-4">
          {adminNavigations.map((nav) => (
            <NavbarMenuItem key={nav.href} className="w-full">
              <Button
                key={nav.href}
                fullWidth
                className="justify-start"
                startContent={nav.icon}
                variant={pathname === nav.href ? "flat" : "light"}
                onPress={() => handleMenuClick(nav.href)}
              >
                {nav.title}
              </Button>
            </NavbarMenuItem>
          ))}
        </div>
        <div className="mt-auto mb-6 flex flex-col items-start">
          <div className="flex gap-3 items-center ml-4 mb-4">
            <Image
              className="w-12 h-12 object-cover rounded-full"
              src={authUser?.profilePictureUrl}
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
          <Button
            as={Link}
            color="primary"
            href="/"
            startContent={<House className="size-5" />}
            variant="light"
          >
            Back to Customer Home
          </Button>
          <Button
            color="danger"
            startContent={<DoorOpen className="size-5" />}
            variant="light"
            onPress={onLogoutPress}
          >
            Logout
          </Button>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

const AdminNavbarClient = ({ authUser }: { authUser: AuthUserType }) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [modalLogout, setModalLogout] = useState<boolean>(false);

  return (
    <>
      {!isMobile ? (
        <AdminNavbarDesktop
          authUser={authUser}
          onLogoutPress={() => setModalLogout(true)}
        />
      ) : (
        <AdminNavbarMobile
          authUser={authUser}
          onLogoutPress={() => setModalLogout(true)}
        />
      )}
      <LogoutModal isOpen={modalLogout} onOpenChange={setModalLogout} />
    </>
  );
};

export default AdminNavbarClient;
