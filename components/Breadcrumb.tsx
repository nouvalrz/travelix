"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";

const Breadcrumb = ({ includeHome = false }: { includeHome?: boolean }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const routeMap = segments.map((segment, index) => {
    if (/^\d+$/.test(segment)) {
      return {
        name: `Detail #${segment}`,
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
