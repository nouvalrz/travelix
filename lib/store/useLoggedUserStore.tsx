import { create } from "zustand";

import { AuthUserType } from "@/types/authUser.type";

type LoggedUserStore = {
  user: AuthUserType | null;
  setUser: (user: AuthUserType | null) => void;
};

export const useLoggedUserStore = create<LoggedUserStore>((set, get) => {
  return {
    user: null,
    setUser: (user) => set({ user: user }),
  };
});
