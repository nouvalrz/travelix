import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useLoggedUserStore } from "../store/useLoggedUserStore";

export const useRedirectLoginMiddleware = () => {
  const router = useRouter();
  const { user } = useLoggedUserStore();
  const pathname = usePathname();

  const wrap = useCallback(
    (callback: (...args: any[]) => void | Promise<void>) => {
      return (...args: any[]) => {
        if (!user) {
          router.push(`/login?prevUrl=${encodeURIComponent(pathname)}`);

          return;
        }
        callback(...args);
      };
    },
    [user, pathname, router]
  );

  return wrap;
};
