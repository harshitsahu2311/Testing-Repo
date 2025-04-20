import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  currentUser: any | null; // You can replace `any` with a specific type for user data if available
  isLoading: boolean;
  error: string | null;
  login: (token: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string) => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      currentUser: null,
      isLoading: false,
      error: null,
      login: async (token: string, userData: any) => {
        localStorage.setItem("auth-token", token);
        set({ currentUser: userData, isLoading: false, error: null });
      },
      logout: async () => {
        localStorage.removeItem("auth-token");
        set({ currentUser: null, isLoading: false, error: null });
      },
      setError: (error: string) => {
        set({ error, isLoading: false, currentUser: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
