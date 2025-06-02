import { NextRequest, NextResponse } from "next/server";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { verifyJWT } from "@/lib/jwt";

export const GET = async (req: NextRequest) => {
  const cookies = req.cookies;
  const token = cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tokenParsed = await verifyJWT(token);

  const response = await fetchApiFromServer("/logout", {
    method: "GET",
    token: tokenParsed.backendToken,
  });

  const responseData = await response.json();

  const nextResponse = NextResponse.json(responseData, {
    status: response.status,
  });

  nextResponse.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return nextResponse;
};
