import { NextRequest, NextResponse } from "next/server";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { signJWT, verifyJWT } from "@/lib/jwt";
import { User } from "@/types/user.type";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();

  try {
    const res = await fetchApiFromServer("/update-profile", {
      body,
      method: "POST",
    });
    const responseData = await res.json();

    const nextResponse = NextResponse.json(responseData, {
      status: res.status,
    });

    if (res.ok) {
      const userRes = await fetchApiFromServer("/user");
      const user = (await userRes.json()).data as User;
      const token = req.cookies.get("token")?.value;
      const backendToken = token ? (await verifyJWT(token)).backendToken : null;

      const jwtPayload = {
        data: user,
        backendToken: backendToken,
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
