import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const staticPositionPaths = ["/destinations"];

export const useNavbarPosition = () => {
  const [position, setPosition] = useState<"static" | "sticky">("sticky");
  const pathname = usePathname();

  useEffect(() => {
    setPosition(staticPositionPaths.includes(pathname) ? "static" : "sticky");
  }, [pathname]);

  return position;
};
