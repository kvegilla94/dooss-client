import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

type Action = {
  updateUser: (user: State["user"]) => void;
};

const useUser = create<State & Action>(
  persist(
    (set) => ({
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
      },
      updateUser: (user) => set({ user: { ...user } }),
    }),
    { name: "user-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useUser;
