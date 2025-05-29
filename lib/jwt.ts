import { JWTPayload, SignJWT, jwtVerify } from "jose";

import { JWT_SECRET } from "@/config/credentials";

const secret = new TextEncoder().encode(JWT_SECRET!);

export async function signJWT(payload: JWTPayload, expiresIn = "30d") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, secret);

  return payload as unknown as JwtPayload;
}

interface JwtPayload {
  data: {
    id: string;
    role: "admin" | "user";
    email: string;
    profilePictureUrl: string;
    phoneNumber: string;
  };
  backendToken: string;
  exp: number;
}
