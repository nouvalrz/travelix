"use client";

import { useEffect } from "react";

import { useLoggedUserStore } from "@/lib/store/useLoggedUserStore";
import { AuthUserType } from "@/types/authUser.type";

const LoggedUserHydrator = ({ user }: { user: AuthUserType | null }) => {
  const { setUser } = useLoggedUserStore();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return null;
};

export default LoggedUserHydrator;
