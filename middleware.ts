import { NextRequest, NextResponse } from "next/server";

import { verifyJWT } from "./lib/jwt";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ((isUserRoute(pathname) || isAdminRoute(pathname)) && !token) {
    // prev url search param
    const loginUrl = new URL("/login", req.url);

    loginUrl.searchParams.set("prevUrl", req.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  if ((isUserRoute(pathname) || isAdminRoute(pathname)) && token) {
    try {
      const jwtPayload = await verifyJWT(token);
      const { role } = jwtPayload.data;

      if (isAdminRoute(pathname) && role !== "admin") {
        return NextResponse.redirect(new URL("/404", req.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const isAuthRoute = (pathname: string): boolean => {
  const authRoutes = ["/login", "/register"];

  return authRoutes.some((route) => pathname.startsWith(route));
};

// const isGuestRoute = (pathname: string): boolean => {
//   const guestRoutes = ["/", "/destinations", "/promos"];

//   return guestRoutes.some((route) => pathname.startsWith(route));
// };

const isUserRoute = (pathname: string): boolean => {
  const userRoutes = ["/carts", "/me"];

  return userRoutes.some((route) => pathname.startsWith(route));
};

const isAdminRoute = (pathname: string): boolean => {
  const adminRoutes = ["/admin"];

  return adminRoutes.some((route) => pathname.startsWith(route));
};
