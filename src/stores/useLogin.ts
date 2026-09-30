import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  id: number;
  name: string;
  email: string;
  role: string;
  profilePic: string | null;
  accessToken: string;
}

type Store = {
  user: UserAuth | null;
  login: (userData: UserAuth) => void;
  logout: () => void;
};

export const useLoginStore = create<Store>()(
  persist(
    (set) => ({
      user: null,

      login: (user) =>
        set({
          user,
        }),
      logout: () =>
        set({
          user: null,
        }),
    }),
    { name: "auth-storage" },
  ),
);
