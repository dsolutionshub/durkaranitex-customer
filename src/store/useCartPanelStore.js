import { getCart, getWishlist } from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { create } from "zustand";

const useCartPanelStore = create((set, get) => ({
  isCartOpen: false,
  cartProducts: [],
  cartTotalAmount: 0,
  wishListData: [],
  wishListCount: 0,
  cartCount: 0,

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

  cardDetails: async () => {
    loader(true);
    try {
      const data = await getCart();
      set({ cartProducts: data?.cart || [] });
      set({ cartTotalAmount: data?.total_amount });
      set({ cartCount: data?.cart?.length || 0 });
    } catch (error) {
      getErrorMessage(error);
      set({ cartProducts: [] });
    } finally {
      loader(false);
    }
  },

  wishlistDetails: async () => {
    loader(true);
    try {
      const data = await getWishlist();
      set({ wishListData: data?.WishLists || [] });
      set({ wishListCount: data?.WishLists?.length || 0 });
    } catch (error) {
      getErrorMessage(error);
      set({ wishListData: [] });
    } finally {
      loader(false);
    }
  },

  setCartCount: (count) => set({ cartCount: count }),
  setWishListCount: (count) => set({ wishListCount: count }),

  handleGetCartDetail: async () => {
    const { cardDetails } = get();
    await cardDetails();
    set({ isCartOpen: true });
  },
}));

export default useCartPanelStore;
