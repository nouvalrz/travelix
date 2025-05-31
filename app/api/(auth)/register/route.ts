import { NextRequest, NextResponse } from "next/server";

import { fetchApiFromServer } from "@/lib/fetchApi";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();

  try {
    const res = await fetchApiFromServer("/register", { body, method: "POST" });
    const responseData = await res.json();

    return NextResponse.json(responseData, {
      status: res.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error : " + error },
      { status: 500 }
    );
  }
};
