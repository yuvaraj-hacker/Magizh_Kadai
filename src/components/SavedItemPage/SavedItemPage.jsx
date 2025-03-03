
import { useCallback, useEffect, useState } from 'react';
import SavedItems from '../../shared/Components/SavedItems/SavedItems'
import useCart from '../../shared/services/store/useCart';
import useAuth from '../../shared/services/store/useAuth';
// import { deleteAllWishlistItems, deleteWishlistItem, getWishlistItems, updateWishlistItem } from '../../shared/services/wishlist/wishlist';
import toast from 'react-hot-toast';
import { savecartitems } from '../../shared/services/cart/cart';

function SavedItemPage() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, removeWishlistItem, deleteAllWishlist, cartItems } = useCart();
    const { userdetails } = useAuth();

    // const getallwishlist = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getWishlistItems(userdetails?.Email);
    //         setWishlist(response.response || []);
    //     } catch (error) {
    //         console.error("Error fetching wishlist:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [userdetails?.Email]);

    // useEffect(() => {
    //     getallwishlist();
    // }, [getallwishlist]);

    const handleIncreaseQuantity = async (index) => {
        if (!wishlist[index]) return;

        const currentQuantity = Number(wishlist[index].Quantity) || 1;
        const updatedQuantity = currentQuantity + 1;
        const productId = wishlist[index].productId._id;

        try {
            await updateWishlistItem(productId, updatedQuantity, userdetails.Email);
            setWishlist(prevWishlist => {
                const newWishlist = [...prevWishlist];
                newWishlist[index].Quantity = updatedQuantity;
                return newWishlist;
            });
            toast.success("Quantity updated successfully");
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        }
    };

    const handleDecreaseQuantity = async (index) => {
        if (!wishlist[index]) return;

        const currentQuantity = Number(wishlist[index].Quantity) || 1;
        if (currentQuantity <= 1) return;

        const updatedQuantity = currentQuantity - 1;
        const productId = wishlist[index].productId._id;

        try {
            await updateWishlistItem(productId, updatedQuantity, userdetails.Email);
            setWishlist(prevWishlist => {
                const newWishlist = [...prevWishlist];
                newWishlist[index].Quantity = updatedQuantity;
                return newWishlist;
            });
            toast.success("Quantity updated successfully");
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        }
    };


    const handleAddToCart = async (item) => {
        try {
            const cartItemsFromStore = cartItems || [];
            if (cartItemsFromStore.some(cartItem => cartItem.productId?._id === item.productId?._id)) {
                toast.error("Product is already in your cart!");
                return;
            }

            if (userdetails?.Email) {
                const cartData = {
                    productId: item.productId._id,
                    Email: userdetails.Email,
                    Quantity: item.Quantity || 1
                };

                await savecartitems(cartData);

                addToCart({
                    productId: item.productId,
                    Quantity: item.Quantity || 1,
                    _id: item.productId._id
                });

                await removeWishlistSelectedItem(item);

                toast.success("Product added to cart successfully!");
            } else {
                toast.error("Please login to add items to cart");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("Failed to add product to cart. Please try again.");
        }
    };

    const removeWishlistSelectedItem = async (item) => {
        try {
            await deleteWishlistItem(item._id);
            removeWishlistItem(item.productId._id);
            await getallwishlist();
            toast.success("Item removed from wishlist");
        } catch (error) {
            console.error("Error deleting wishlist item:", error);
            toast.error("Failed to remove item");
        }
    };

    const clearWishlist = async () => {
        try {
            if (!userdetails?.Email) {
                toast.error("Please login first");
                return;
            }
            await deleteAllWishlistItems(userdetails.Email);
            deleteAllWishlist();
            setWishlist([]);
            toast.success("Wishlist cleared successfully");
        } catch (error) {
            console.error("Error clearing wishlist:", error);
            toast.error("Failed to clear wishlist");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            </div>
        );
    }
    return (
        <>
            <section className=''>
                <SavedItems wishlist={wishlist} clearWishlist={clearWishlist} removeWishlistSelectedItem={removeWishlistSelectedItem} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} handleAddToCart={handleAddToCart} />
            </section>
        </>
    )
}

export default SavedItemPage
