"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = ({
  includeHome = false,
  uuidReplaceName,
  className,
  variant = "light",
}: {
  includeHome?: boolean;
  uuidReplaceName?: string;
  className?: string;
  variant?: "solid" | "bordered" | "light";
}) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const uuidRegex =
    /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\b/;

  const routeMap = segments.map((segment, index) => {
    if (uuidRegex.test(segment)) {
      return {
        name: uuidReplaceName || "Detail",
        route: "/" + segments.slice(0, index + 1).join("/"),
      };
    }

    return {
      name: segment,
      route: "/" + segments.slice(0, index + 1).join("/"),
    };
  });

  return (
    <Breadcrumbs className={clsx(className)} variant={variant}>
      {includeHome && (
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
      )}
      {routeMap.map((segment) => (
        <BreadcrumbItem key={segment.route} className="capitalize">
          <Link href={segment.route}>
            {segment.name === "admin" ? "dashboard" : segment.name}
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
