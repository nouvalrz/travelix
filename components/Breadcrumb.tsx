"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";

const Breadcrumb = ({
  includeHome = false,
  uuidReplaceName,
}: {
  includeHome?: boolean;
  uuidReplaceName?: string;
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
    <Breadcrumbs>
      {includeHome && <BreadcrumbItem href="/">Home</BreadcrumbItem>}
      {routeMap.map((segment) => (
        <BreadcrumbItem
          key={segment.route}
          className="capitalize"
          href={segment.route}
        >
          {segment.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
