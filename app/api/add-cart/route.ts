import { NextRequest, NextResponse } from "next/server";

import { fetchApiFromServer } from "@/lib/fetchApi";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const response = await fetchApiFromServer("/add-cart", {
      method: "POST",
      body,
    });

    const responseData = await response.json();

    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error : " + error },
      { status: 500 }
    );
  }
};
