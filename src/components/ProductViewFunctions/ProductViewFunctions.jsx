import { useCallback, useEffect, useRef, useState } from "react";
import ProductView from "../../shared/Components/Product-View/ProductView";
import { useParams } from "react-router-dom";
import useAuth from "../../shared/services/store/useAuth";
import useCart from "../../shared/services/store/useCart";
import toast from "react-hot-toast";
import { deletecartItem, savecartitems, updatecartItem } from "../../shared/services/cart/cart";
import { apigetproductbyid } from "../../shared/services/apiproducts/apiproduct";
import { getWishlistItems, RemoveWishlistItem, savewishitems } from "../../shared/services/wishlist/wishlist";
import useMediaQuery from "../../shared/Components/Product-View/useMediaQuery";

export default function ProductViewFunctions () {

    const [product, setProduct] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [similarItems, setSimilarItems] = useState([]);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const { id } = useParams();
    // const [isFullScreen, setIsFullScreen] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [isMobile, setIsMobile] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const descriptionRef = useRef(null);
    const [mainImage, setMainImage] = useState('');
    const [reviewTotalLength, setReviewTotalLength] = useState(0);
    // const [imageContainerSize, setImageContainerSize] = useState({ width: 500, height: 500 });
    const [wishlistData,setWishlistData] = useState([]);
    const [visible, setVisible] = useState(false);

    const { userdetails } = useAuth();
    const { addToCart, cartItems, removeItem, decreaseQuantity, increaseQuantity,updateTotalCartItems} = useCart();

    const getCurrentCartQuantity = () => {
        const cartItem = cartItems.find(item => item._id === product?._id);
        return cartItem ? cartItem.Quantity : 0;
    };

    const handleAddToCart = async (product) => {
        if (product.QTY === 0) {
        toast.error("This item is currently out of stock!");
        return;
        }

        if (cartItems.some(item => item._id === product._id)) {
        toast.error("Product is already in your cart!");
        return;
        }

        try {
        if (userdetails?.Email) {
            const cartData = { productId: product._id, Email: userdetails.Email, Quantity: 1 };
            await savecartitems(cartData);
        }
        addToCart(product);
        toast.success("Product added to cart successfully!");
        updateTotalCartItems()
        } catch (error) {
        toast.error("Failed to add product to cart.");
        console.error("Error adding product to cart:", error);
        }
    };

    const handleIncreaseQuantity = async () => {
        const currentQuantity = getCurrentCartQuantity();

        try {
        if (userdetails?.Email) {
            const cartItem = cartItems.find(item => item._id === product._id);
            if (cartItem) {
            await updatecartItem(cartItem._id, product._id, currentQuantity + 1, userdetails.Email);
            }
        }
        increaseQuantity(product._id);
        } catch (error) {
        toast.error("Failed to update quantity");
        console.error("Error updating quantity:", error);
        }
    };

    const handleDecreaseQuantity = async () => {
        const currentQuantity = getCurrentCartQuantity();
        if (currentQuantity <= 1) {
        handleDelete();
        return;
        }
        try {
        if (userdetails?.Email) {
            const cartItem = cartItems.find(item => item._id === product._id);
            if (cartItem) {
            await updatecartItem(cartItem._id, product._id, currentQuantity - 1, userdetails.Email);
            }
        }
        decreaseQuantity(product._id);
        } catch (error) {
        toast.error("Failed to update quantity");
        console.error("Error updating quantity:", error);
        }
    };

    const handleDelete = async () => {
        try {
        if (userdetails?.Email) {
            const cartItem = cartItems.find(item => item._id === product._id);
            if (cartItem) {
            await deletecartItem(cartItem._id);
            }
        }
        removeItem(product._id);
        toast.success("Item removed from cart");
        } catch (error) {
        toast.error("Failed to remove item");
        console.error("Error removing cart item:", error);
        }
    };

    const mainImageRef = useRef(null);
    const [zoomStyle, setZoomStyle] = useState({});

    const handleMouseMove = (e) => {
        if (!isMobile) {
        const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: 'scale(2.0)',
        });
        }
    };

    const handleMouseLeave = () => {
        setZoomStyle({ transform: 'scale(1)' });
    };

    const getWishlistItem = useCallback(async () => {
        var res = await getWishlistItems(userdetails?.Email);
        setWishlistData(res.response)
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const data = await apigetproductbyid(id);
            if (data) {
            setProduct(data.resdata.product);
            setSimilarItems(data.resdata.SimilerItems);
            setMainImage(data.resdata.product.Images[0]);
            setReviewData(data.resdata.reviews);
            setReviewTotalLength(data.resdata.reviewTotalLength);
            await getWishlistItem()
            } else {
            toast.error("Product not found");
            }
        } catch (err) {
            // toast.error("Failed to load product details");
            console.error("Error fetching product:", err);
        }
        };

        fetchProduct();
    }, [id]);

    const handleAddToWishlist = async (prod) => {
        try{
        if (userdetails?.Email) {

            if (wishlistData?.some(item => item.productId._id === prod._id)) {
                await RemoveWishlistItem({Email:userdetails?.Email, productId: prod._id})
                await getWishlistItem();
            }
            else{
                const wishlistDatas = { productId: prod._id, Email: userdetails.Email, Quantity: 1 };
                await savewishitems(wishlistDatas);
                await getWishlistItem();
                toast.success('Added to Wishlist!');
            }

        } else {
                setVisible(true);
                toast.error('Please log in to save items!', { position: 'bottom-center', icon: '📢' });
        }
        } catch (error) {
        console.error(error);
        }
    };

    if (!product) {
        return <div className="flex items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>;
    }

    return(
        <>
            <ProductView product={product} mainImage={mainImage} setMainImage={setMainImage} mainImageRef={mainImageRef} zoomStyle={zoomStyle} handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave} getCurrentCartQuantity={getCurrentCartQuantity} handleAddToCart={handleAddToCart} handleDelete={handleDelete}
                handleDecreaseQuantity={handleDecreaseQuantity} handleIncreaseQuantity={handleIncreaseQuantity} handleAddToWishlist={handleAddToWishlist} wishlistData={wishlistData}
                setIsTooltipVisible={setIsTooltipVisible} isTooltipVisible={isTooltipVisible} setIsDescriptionOpen={setIsDescriptionOpen} isDescriptionOpen={isDescriptionOpen}
                descriptionRef={descriptionRef} similarItems={similarItems} visible={visible} setVisible={setVisible} />
        </>
    )
}