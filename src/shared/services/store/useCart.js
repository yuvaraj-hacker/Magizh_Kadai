import { create } from "zustand";

const storedCartItems = localStorage.getItem("cartItems");
const storedWishlistItems = localStorage.getItem("wishlist");
const storedcartCount = localStorage.getItem("cartCount");
const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
const initialWishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
const initialcartCount = storedcartCount ? storedcartCount : 0;

const useCart = create((set) => ({
    cartItems: initialCartItems,
    wishlist: initialWishlistItems,
    cartCount: initialcartCount,

    setCartItem: (items) =>{
        localStorage.setItem("cartCount", 0);
        localStorage.setItem("cartItems", JSON.stringify(items));
        set({ cartCount: 0 })
        set({ cartItems: items })
    },

    addToCart: (item) => {
        set((state) => {
            const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === item._id);
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].Quantity += 1;
                updatedCartItems[existingItemIndex].Height = item.Height;
                updatedCartItems[existingItemIndex].Width = item.Width;
                updatedCartItems[existingItemIndex].Subtotal = item.Subtotal;
                updatedCartItems[existingItemIndex].Price = item.Price;
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                return { cartItems: updatedCartItems };
            }
            const updatedCartItems = [...state.cartItems, { ...item, Quantity: 1, Height: item.Height, Width: item.Width }];
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return { cartItems: updatedCartItems };
        });
    },

    addWishlistToCart: ( ) => {
        set((state) => {
            //console.log(state)
            const updatedCartItems = state.cartItems.length !=0? [...state.cartItems,...state.wishlist]:state.wishlist;
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            localStorage.removeItem("wishlist");
            return { cartItems: updatedCartItems,wishlist:[] };
        });
    },

    addToWishlist: (item) => {
        set((state) => {
            const existingItemIndex = state.wishlist.findIndex((wishlistItem) => wishlistItem._id === item._id);
            if (existingItemIndex !== -1) {
                const updatedWishlist = state.wishlist.filter((wishlistItem) => wishlistItem._id !== item._id);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
                return { wishlist: updatedWishlist };
            }
            const updatedWishlist = [...state.wishlist, item];
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return { wishlist: updatedWishlist };
        });
    },
    
    increaseQuantity: (productId) => {
      set((state) => {
          const updatedCartItems = state.cartItems.map(item => {
              if (item._id === productId) {
                  return { ...item, Quantity: item.Quantity + 1 };
              }
              return item;
          });
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          return { cartItems: updatedCartItems };
      });
    },

    increaseWhitelistQuantity: (productId) => {
        console.log(productId)
        set((state) => {
            const updatedCartItems = state.wishlist.map(item => {
                if (item._id === productId) {
                    return { ...item, Quantity: item.Quantity + 1 };
                }
                return item;
            });
            localStorage.setItem("wishlist", JSON.stringify(updatedCartItems));
            return { wishlist: updatedCartItems };
        });
    },
  
    decreaseQuantity: (productId) => {
        set((state) => {
            const updatedCartItems = state.cartItems.map(item => {
                if (item._id === productId && item.Quantity > 1) {
                    return { ...item, Quantity: item.Quantity - 1 };
                }
                return item;
            });
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return { cartItems: updatedCartItems };
        });
    },

    decreaseWhitelistQuantity: (productId) => {
        set((state) => {
            const updatedCartItems = state.wishlist.map(item => {
                if (item._id === productId && item.Quantity > 1) {
                    return { ...item, Quantity: item.Quantity - 1 };
                }
                return item;
            });
            localStorage.setItem("wishlist", JSON.stringify(updatedCartItems));
            return { wishlist: updatedCartItems };
        });
    },

    removeWishlistItem: (productId) => {
        set((state) => {
            const updatedWishlist = state.wishlist.filter((item) => item._id !== productId);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return { wishlist: updatedWishlist };
        });
    },

    deleteAllWishlist: () => {
        set({ wishlist: [] });
        localStorage.removeItem("wishlist");
    },  

    removeItem: (productId) => {
        set((state) => {
            const updatedCartItems = state.cartItems.filter((product) => product._id !== productId);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return { cartItems: updatedCartItems };
        });
    },

    deleteAllItems: () => {
        set({ cartItems: [] });
        set({ cartCount: 0 });
        localStorage.removeItem("cartItems");
        localStorage.setItem("cartCount",0);
    },

   

    getTotalCartItems: (response) => {
        localStorage.setItem("cartCount",response);
        set({cartCount:localStorage.getItem("cartCount")});
    },

    updateTotalCartItems: () => {
        const currentTotal = parseInt(localStorage.getItem('TotalCartItems') || '0');
        localStorage.setItem('TotalCartItems', (currentTotal + 1).toString());
    },
}));

export default useCart;
