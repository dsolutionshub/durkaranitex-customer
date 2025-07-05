import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  isLoggedIn: null,
  userData: {},

  setIsLoginTrue: () => {
    set({ isLoggedIn: true });
  },

  setIsLoginFalse: () => {
    set({ isLoggedIn: false });
  },

  handleSaveUserData: (data) => {
    set({ userData: data });
  },

  handleLogout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.clear();
    const { setIsLoginFalse } = get();
    setIsLoginFalse();
  },
}));
