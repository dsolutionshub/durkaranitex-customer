import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: null,
      userData: {},

      setIsLoginAuth: (value) => {
        set({ isLoggedIn: value });
      },

      handleSaveUserData: (data) => {
        set({ userData: data });
      },

      handleLogout: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.clear();
        const { setIsLoginAuth } = get();
        setIsLoginAuth(false);
        set({ userData: {} });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
      }),
    }
  )
);
