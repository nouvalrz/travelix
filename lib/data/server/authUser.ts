import { cookies } from "next/headers";

import { verifyJWT } from "@/lib/jwt";
import { AuthUserType } from "@/types/authUser.type";

export const getAuthUser = async (): Promise<AuthUserType | null> => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token")?.value;

  if (token) {
    const tokenPayload = await verifyJWT(token);

    return tokenPayload.data;
  } else {
    return null;
  }
};
