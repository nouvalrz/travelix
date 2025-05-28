import { NextRequest, NextResponse } from "next/server";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { signJWT } from "@/lib/jwt";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();

  try {
    const res = await fetchApiFromServer("/login", { body, method: "POST" });
    const responseData = await res.json();

    const nextResponse = NextResponse.json(responseData, {
      status: res.status,
    });

    if (res.ok) {
      if (!responseData.token) throw new Error("Token Not Found");
      const jwtPayload = {
        data: responseData.data,
        backendToken: responseData.token,
      };

      const jwtResult = await signJWT(jwtPayload);

      nextResponse.cookies.set({
        name: "token",
        value: jwtResult,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error : " + error },
      { status: 500 }
    );
  }
};
