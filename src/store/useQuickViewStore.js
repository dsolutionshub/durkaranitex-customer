import { create } from "zustand";

const useQuickViewStore = create((set) => ({
  productId: null,
  openQuickView: (id) => {
    if (!id) {
      return;
    }
    set({ productId: id });
  },
  closeQuickView: () => set({ productId: null }),
}));

export default useQuickViewStore;
