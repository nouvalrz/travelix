import { NextRequest, NextResponse } from "next/server";

import { API_URL, API_KEY } from "@/config/credentials";
import { verifyJWT } from "@/lib/jwt";

export const GET = async (req: NextRequest) => {
  try {
    if (!API_URL) throw new Error("Missing API_URL");
    if (!API_KEY) throw new Error("Missing API_KEY");

    const path = req.nextUrl.pathname.replace("/api/proxy/", "");
    const url = `${API_URL}/${path}${req.nextUrl.search}`;

    const token = req.cookies.get("token")?.value;
    const backendToken = token ? (await verifyJWT(token)).backendToken : null;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        apiKey: API_KEY,
        ...(backendToken ? { Authorization: `Bearer ${backendToken}` } : {}),
        ...Object.fromEntries(req.headers),
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Next JS Error: ${error}` },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    if (!API_URL) throw new Error("Missing API_URL");
    if (!API_KEY) throw new Error("Missing API_KEY");

    const path = req.nextUrl.pathname.replace("/api/proxy/", "");
    const url = `${API_URL}/${path}${req.nextUrl.search}`;

    const token = req.cookies.get("token")?.value;
    const backendToken = token ? (await verifyJWT(token)).backendToken : null;

    const headers = new Headers(req.headers);

    headers.delete("host");

    const contentType = req.headers.get("content-type") || "";
    let body: any;

    if (contentType.includes("application/json")) {
      body = await req.text();
    } else {
      body = await req.arrayBuffer();
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        apiKey: API_KEY,
        ...(backendToken ? { Authorization: `Bearer ${backendToken}` } : {}),
        ...Object.fromEntries(req.headers),
      },
      body: body,
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Next JS Error: ${error}` },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    if (!API_URL) throw new Error("Missing API_URL");
    if (!API_KEY) throw new Error("Missing API_KEY");

    const path = req.nextUrl.pathname.replace("/api/proxy/", "");
    const url = `${API_URL}/${path}${req.nextUrl.search}`;

    const token = req.cookies.get("token")?.value;
    const backendToken = token ? (await verifyJWT(token)).backendToken : null;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        apiKey: API_KEY,
        ...(backendToken ? { Authorization: `Bearer ${backendToken}` } : {}),
        ...Object.fromEntries(req.headers),
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Next JS Error: ${error}` },
      { status: 500 }
    );
  }
};
