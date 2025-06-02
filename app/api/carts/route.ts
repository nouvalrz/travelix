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

  const response = await fetchApiFromServer("/carts", {
    method: "GET",
    token: tokenParsed.backendToken,
  });

  const responseData = await response.json();

  return NextResponse.json(responseData, { status: response.status });
};
