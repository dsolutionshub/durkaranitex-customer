import { getCart } from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { create } from "zustand";

const useCartPanelStore = create((set, get) => ({
  isCartOpen: false,
  cartProducts: [],
  cartTotalAmount: 0,

  setCartOpen: (open) => set({ isCartOpen: open }),

  incrementQty: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decrementQty: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter((item) => item.id !== id),
    })),

  cardDetails: async () => {
    loader(true);
    try {
      const data = await getCart();
      set({ cartProducts: data?.cart || [] });
      set({ cartTotalAmount: data?.total_amount });
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  },

  handleGetCartDetail: async () => {
    const { cardDetails } = get();
    await cardDetails();
    set({ isCartOpen: true });
  },
}));

export default useCartPanelStore;
