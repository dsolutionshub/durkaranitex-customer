import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      wishItems: [],
      addToCart: (item) => {
        const items = get().items;
        const exists = items.find((i) => i.id === item.id);
      
        if (exists) {
          const updatedItems = items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },      
      addToWishlist: (item) => {
        const wishItems = get().wishItems
        const exists = wishItems.find((i) => i.id === item.id)

        if (!exists) {
          set({ wishItems: [...wishItems, item] })
        }
      },

      removeFromWishlist: (id) => {
        set({ wishItems: get().wishItems.filter((i) => i.id !== id) })
      },    
      
      removeFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      }
    }),
    {
      name: 'cart-storage', 
    }
  )
)

export default useCartStore
