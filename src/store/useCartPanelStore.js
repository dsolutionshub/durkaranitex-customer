import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { create } from "zustand";

const useCartPanelStore = create((set, get) => ({
  isCartOpen: false,
  cartProducts: [
    {
      id: 1,
      title: "Embossed Silk Set",
      imgsrc: "/images/combo_1.jpeg",
      subImage: "/images/combo_2.jpeg",
      description: "Finding perfect t-shirt",
      price: "1300.00",
      quantity: 2,
    },
    {
      id: 2,
      title: "Semi Slik Combo Set",
      imgsrc: "/images/combo_2.jpeg",
      subImage: "/images/combo_1.jpeg",
      description: "Finding perfect products",
      price: "1500.00",
      quantity: 1,
    },
    {
      id: 3,
      title: "Cotton blended combos",
      imgsrc: "/images/combo_9.jpeg",
      subImage: "/images/combo_2.jpeg",
      description: "Finding perfect products",
      price: "1000.00",
      quantity: 6,
    },
     {
      id: 5,
      title: "Embossed Silk Set",
      imgsrc: "/images/combo_1.jpeg",
      subImage: "/images/combo_2.jpeg",
      description: "Finding perfect t-shirt",
      price: "1300.00",
      quantity: 2,
    },
  ],

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

  handleGetCartDetail: () => {
    loader(true);
    try {
      // Cart detail API
    } catch (error) {
      const MSG = getErrorMessage(error);
      console.log(MSG);
    } finally {
      loader(false);
      set({ isCartOpen: true });
    }
  },
}));

export default useCartPanelStore;
