import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: null,

  setIsLoginTrue: () => {
    set({ isLoggedIn: true });
  },

  setIsLoginFalse: () => {
    set({ isLoggedIn: false });
  },

  handleLogout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.clear();
    const { setIsLoginFalse } = get();
    setIsLoginFalse();
  },
}));
