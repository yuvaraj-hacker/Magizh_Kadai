import toast from "react-hot-toast";
import {
    create
} from "zustand";

const isB2B = window.location.search.includes("showB2B=true");
const storedCartItems = localStorage.getItem(isB2B ? "b2bCartItems" : "cartItems");
const storedcartCount = localStorage.getItem(isB2B ? "b2bCartCount" : "cartCount");
const storedWishlistItems = localStorage.getItem("wishlist");

const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
const initialcartCount = storedcartCount ? storedcartCount : 0;

const initialWishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
const useCart = create((set, get) => ({
    cartItems: initialCartItems,
    wishlist: initialWishlistItems,
    cartCount: initialcartCount,

    setCartItem: (items) => {
        const isB2B = window.location.search.includes("showB2B=true");
        localStorage.setItem(isB2B ? "b2bCartItems" : "cartItems", JSON.stringify(items));
        localStorage.setItem(isB2B ? "b2bCartCount" : "cartCount", "0");
        set({
            cartItems: items,
            cartCount: 0
        });
    },

    addToCart: (item) => {
        const isB2B = window.location.search.includes("showB2B=true");
        const initialQuantity = isB2B ? 10 : 1;

        set((state) => {
            const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === item._id);
            let updatedCartItems;
            if (existingItemIndex !== -1) {
                updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    Quantity: updatedCartItems[existingItemIndex].Quantity + initialQuantity,
                    Height: item.Height,
                    Width: item.Width,
                    Subtotal: item.Subtotal,
                    Price: item.Price
                };
            } else {
                updatedCartItems = [
                    ...state.cartItems,
                    {
                        ...item,
                        Quantity: initialQuantity,
                        Height: item.Height,
                        Width: item.Width
                    }
                ];
            }

            localStorage.setItem(isB2B ? "b2bCartItems" : "cartItems", JSON.stringify(updatedCartItems));
            return {
                cartItems: updatedCartItems
            };
        });
    },

    addWishlistToCart: () => {
        set((state) => {
            //console.log(state)
            const updatedCartItems = state.cartItems.length != 0 ? [...state.cartItems, ...state.wishlist] : state.wishlist;
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            localStorage.removeItem("wishlist");
            return {
                cartItems: updatedCartItems,
                wishlist: []
            };
        });
    },

    addToWishlist: (item) => {
        set((state) => {
            const existingItemIndex = state.wishlist.findIndex((wishlistItem) => wishlistItem._id === item._id);
            if (existingItemIndex !== -1) {
                const updatedWishlist = state.wishlist.filter((wishlistItem) => wishlistItem._id !== item._id);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
                return {
                    wishlist: updatedWishlist
                };
            }
            const updatedWishlist = [...state.wishlist, item];
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return {
                wishlist: updatedWishlist
            };
        });
    },

    // increaseQuantity: (productId) => {
    //     set((state) => {
    //         const updatedCartItems = state.cartItems.map(item => {
    //             if (item._id === productId) {
    //                 return {
    //                     ...item,
    //                     Quantity: item.Quantity + 1
    //                 };
    //             }
    //             return item;
    //         });
    //         localStorage.setItem( isB2B ? "b2bCartItems" : "cartItems", JSON.stringify(updatedCartItems));
    //         return {
    //             cartItems: updatedCartItems
    //         };
    //     });
    // },
    increaseQuantity: (productId ) => {
        const isB2B = window.location.search.includes("showB2B=true");
        const increment = isB2B ? 10 : 1
        set((state) => {
            const updatedCartItems = state.cartItems.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        Quantity: item.Quantity + increment
                    };
                }
                return item;
            });
            localStorage.setItem(
                isB2B ? "b2bCartItems" : "cartItems",
                JSON.stringify(updatedCartItems)
            );
            return {
                cartItems: updatedCartItems
            };
        });
    },


    increaseWhitelistQuantity: (productId) => {
        console.log(productId)
        set((state) => {
            const updatedCartItems = state.wishlist.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        Quantity: item.Quantity + 1
                    };
                }
                return item;
            });
            localStorage.setItem("wishlist", JSON.stringify(updatedCartItems));
            return {
                wishlist: updatedCartItems
            };
        });
    },

    decreaseQuantity: (productId) => {
        const decrement = isB2B ? 10 : 1
        set((state) => {
            const updatedCartItems = state.cartItems.map(item => {
                if (item._id === productId && item.Quantity > 1) {
                    const newQuantity = item.Quantity - decrement;
                    // toast.success(`Quantity decreased to ${newQuantity}` );
                    return {
                        ...item,
                        Quantity: newQuantity
                    };
                }
                return item;
            });
            localStorage.setItem(isB2B ? "b2bCartItems" : "cartItems", JSON.stringify(updatedCartItems));
            return {
                cartItems: updatedCartItems
            };
        });
    },

    decreaseWhitelistQuantity: (productId) => {
        set((state) => {
            const updatedCartItems = state.wishlist.map(item => {
                if (item._id === productId && item.Quantity > 1) {
                    return {
                        ...item,
                        Quantity: item.Quantity - 1
                    };
                }
                return item;
            });
            localStorage.setItem("wishlist", JSON.stringify(updatedCartItems));
            return {
                wishlist: updatedCartItems
            };
        });
    },

    removeWishlistItem: (productId) => {
        set((state) => {
            const updatedWishlist = state.wishlist.filter((item) => item._id !== productId);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return {
                wishlist: updatedWishlist
            };
        });
    },

    deleteAllWishlist: () => {
        set({
            wishlist: []
        });
        localStorage.removeItem("wishlist");
    },

    removeItem: (productId) => {
        const isB2B = window.location.search.includes("showB2B=true");
        const cartKey = isB2B ? "b2bCartItems" : "cartItems";
        set((state) => {
            const updatedCartItems = state.cartItems.filter((product) => product._id !== productId);
            toast.success("Item removed from cart");
            localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
            return {
                cartItems: updatedCartItems
            };
        });
    },

    deleteAllItems: () => {
        const isB2B = window.location.search.includes("showB2B=true");
        const cartKey = isB2B ? "b2bCartItems" : "cartItems";
        const countKey = isB2B ? "b2bCartCount" : "cartCount";

        set({
            cartItems: [],
            cartCount: 0
        });

        localStorage.removeItem(cartKey);
        localStorage.setItem(countKey, "0");
    },




    getTotalCartItems: (response) => {
        localStorage.setItem("cartCount", response);
        set({
            cartCount: localStorage.getItem("cartCount")
        });
    },

    updateTotalCartItems: () => {
        const currentTotal = parseInt(localStorage.getItem('TotalCartItems') || '0');
        localStorage.setItem('TotalCartItems', (currentTotal + 1).toString());
    },
}));

export default useCart;


// import { create } from "zustand";
// import toast from "react-hot-toast";

// const isB2B = new URLSearchParams(window.location.search).get('showB2B') === 'true';

// const cartKey = isB2B ? "cartItems_b2b" : "cartItems";
// const cartCountKey = isB2B ? "cartCount_b2b" : "cartCount";

// const storedCartItems = localStorage.getItem(cartKey);
// const storedWishlistItems = localStorage.getItem("wishlist");
// const storedcartCount = localStorage.getItem(cartCountKey);

// const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
// const initialWishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
// const initialcartCount = storedcartCount ? storedcartCount : 0;

// const useCart = create((set) => ({
//     cartItems: initialCartItems,
//     wishlist: initialWishlistItems,
//     cartCount: initialcartCount,

//     setCartItem: (items) => {
//         localStorage.setItem(cartCountKey, 0);
//         localStorage.setItem(cartKey, JSON.stringify(items));
//         set({ cartCount: 0, cartItems: items });
//     },

//     addToCart: (item) => {
//         set((state) => {
//             const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === item._id);
//             if (existingItemIndex !== -1) {
//                 const updatedCartItems = [...state.cartItems];
//                 updatedCartItems[existingItemIndex] = {
//                     ...updatedCartItems[existingItemIndex],
//                     Quantity: updatedCartItems[existingItemIndex].Quantity + 1,
//                     Height: item.Height,
//                     Width: item.Width,
//                     Subtotal: item.Subtotal,
//                     Price: item.Price,
//                 };
//                 localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
//                 return { cartItems: updatedCartItems };
//             }
//             const updatedCartItems = [...state.cartItems, { ...item, Quantity: 1 }];
//             localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
//             return { cartItems: updatedCartItems };
//         });
//     },

//     addWishlistToCart: () => {
//         set((state) => {
//             const updatedCartItems = state.cartItems.length !== 0
//                 ? [...state.cartItems, ...state.wishlist]
//                 : state.wishlist;
//             localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
//             localStorage.removeItem("wishlist");
//             return { cartItems: updatedCartItems, wishlist: [] };
//         });
//     },

//     addToWishlist: (item) => {
//         set((state) => {
//             const exists = state.wishlist.find((w) => w._id === item._id);
//             const updatedWishlist = exists
//                 ? state.wishlist.filter((w) => w._id !== item._id)
//                 : [...state.wishlist, item];
//             localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//             return { wishlist: updatedWishlist };
//         });
//     },

//     increaseQuantity: (productId) => {
//         set((state) => {
//             const updated = state.cartItems.map((item) =>
//                 item._id === productId ? { ...item, Quantity: item.Quantity + 1 } : item
//             );
//             localStorage.setItem(cartKey, JSON.stringify(updated));
//             return { cartItems: updated };
//         });
//     },

//     increaseWishlistQuantity: (productId) => {
//         set((state) => {
//             const updated = state.wishlist.map((item) =>
//                 item._id === productId ? { ...item, Quantity: item.Quantity + 1 } : item
//             );
//             localStorage.setItem("wishlist", JSON.stringify(updated));
//             return { wishlist: updated };
//         });
//     },

//     decreaseQuantity: (productId) => {
//         set((state) => {
//             const updated = state.cartItems.map((item) =>
//                 item._id === productId && item.Quantity > 1
//                     ? { ...item, Quantity: item.Quantity - 1 }
//                     : item
//             );
//             localStorage.setItem(cartKey, JSON.stringify(updated));
//             return { cartItems: updated };
//         });
//     },

//     decreaseWishlistQuantity: (productId) => {
//         set((state) => {
//             const updated = state.wishlist.map((item) =>
//                 item._id === productId && item.Quantity > 1
//                     ? { ...item, Quantity: item.Quantity - 1 }
//                     : item
//             );
//             localStorage.setItem("wishlist", JSON.stringify(updated));
//             return { wishlist: updated };
//         });
//     },

//     removeWishlistItem: (productId) => {
//         set((state) => {
//             const updated = state.wishlist.filter((item) => item._id !== productId);
//             localStorage.setItem("wishlist", JSON.stringify(updated));
//             return { wishlist: updated };
//         });
//     },

//     deleteAllWishlist: () => {
//         set({ wishlist: [] });
//         localStorage.removeItem("wishlist");
//     },

//     removeItem: (productId) => {
//         set((state) => {
//             const updated = state.cartItems.filter((item) => item._id !== productId);
//             toast.success("Item removed from cart");
//             localStorage.setItem(cartKey, JSON.stringify(updated));
//             return { cartItems: updated };
//         });
//     },

//     deleteAllItems: () => {
//         set({ cartItems: [], cartCount: 0 });
//         localStorage.removeItem(cartKey);
//         localStorage.setItem(cartCountKey, 0);
//     },

//     getTotalCartItems: (response) => {
//         localStorage.setItem(cartCountKey, response);
//         set({ cartCount: localStorage.getItem(cartCountKey) });
//     },

//     updateTotalCartItems: () => {
//         const currentTotal = parseInt(localStorage.getItem('TotalCartItems') || '0');
//         localStorage.setItem('TotalCartItems', (currentTotal + 1).toString());
//     },
// }));

// export default useCart;