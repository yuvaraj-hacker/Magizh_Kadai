import { useCallback, useEffect, useRef, useState } from "react";
import ProductView from "../../shared/Components/Product-View/ProductView";
import { useParams } from "react-router-dom";
import useAuth from "../../shared/services/store/useAuth";
import useCart from "../../shared/services/store/useCart";
import toast from "react-hot-toast";
import { deletecartItem, savecartitems, updatecartItem } from "../../shared/services/cart/cart";
import { apigetproductbyid } from "../../shared/services/apiproducts/apiproduct";
// import { getWishlistItems, RemoveWishlistItem, savewishitems } from "../../shared/services/wishlist/wishlist";
import useMediaQuery from "../../shared/Components/Product-View/useMediaQuery";
import { SyncLoader } from "react-spinners";

export default function ProductViewFunctions() {

    const [product, setProduct] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [similarItems, setSimilarItems] = useState([]);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const { id } = useParams();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
    const descriptionRef = useRef(null);
    const [mainImage, setMainImage] = useState('');
    const [reviewTotalLength, setReviewTotalLength] = useState(0);
    const [wishlistData, setWishlistData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [contentHeight, setContentHeight] = useState("auto");

    const { userdetails } = useAuth();
    const { addToCart, cartItems, removeItem, decreaseQuantity, increaseQuantity, updateTotalCartItems } = useCart();
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
    useEffect(() => {
        if (descriptionRef.current) {
            setContentHeight(`${descriptionRef.current.scrollHeight}px`);
        }
    }, [isDescriptionOpen]);

    const handleIncreaseQuantity = async () => {
        const currentQuantity = getCurrentCartQuantity();
        if (currentQuantity >= product.QTY) {
            toast.error(`Limit reached! ${product?.QTY}`, { icon: "📢" });
            return;
        }
        try {
            if (userdetails?.Email) {
                const cartItem = cartItems.find(item => item._id === product._id);
                if (cartItem) {
                    await updatecartItem(cartItem._id, product._id, currentQuantity + 1, userdetails.Email);
                }
            }

            increaseQuantity(product._id);
            toast.success(`Quantity increased! ${currentQuantity + 1}`);
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

    // const getWishlistItem = useCallback(async () => {
    //     var res = await getWishlistItems(userdetails?.Email);
    //     setWishlistData(res.response)
    // }, [id]);

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
        try {
            if (userdetails?.Email) {

                if (wishlistData?.some(item => item.productId._id === prod._id)) {
                    await RemoveWishlistItem({ Email: userdetails?.Email, productId: prod._id })
                    await getWishlistItem();
                }
                else {
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
        return (
            <div className="flex justify-center items-center min-h-screen">
                <SyncLoader color="#024A34" />
            </div>
        )
    }

    const handleBuyNow = () => {
        let message = "New Order Request:\n\n";
        const productTotal = product.Discount > 0
            ? (product.Sale_Price)
            : (product.Sale_Price);

        message += `1. ${product.Product_Name}\n`;
        message += `Quantity: 1\n`;
        message += `Price: ₹${productTotal}\n`;
        message += `Link: https://www.magizhkadai.com/product-details/${product._id}\n\n`;

        message += `Order Summary:\n`;
        message += `Total Items: 1\n`;
        message += `Final Total: ₹${productTotal}\n`;

        const whatsappUrl = `https://wa.me/+918925035367?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleRequestStock = () => {
        let message = "Product Request:\n\n";
        message += `I need to buy the following item(s), but they are currently out of stock. Please restock them:\n\n`;
        message += `1. ${product.Product_Name}\n`;
        message += `Link: https://www.magizhkadai.com/product-details/${product._id}\n\n`;
        message += `Please notify me when it's available. Thank you!`;
        const whatsappUrl = `https://wa.me/+918925035367?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <>
            <div className="min-h-[60vh]">
                <ProductView product={product} mainImage={mainImage} handleBuyNow={handleBuyNow} handleRequestStock={handleRequestStock} contentHeight={contentHeight} setMainImage={setMainImage} mainImageRef={mainImageRef} zoomStyle={zoomStyle} handleMouseMove={handleMouseMove}
                    handleMouseLeave={handleMouseLeave} getCurrentCartQuantity={getCurrentCartQuantity} handleAddToCart={handleAddToCart} handleDelete={handleDelete}
                    handleDecreaseQuantity={handleDecreaseQuantity} handleIncreaseQuantity={handleIncreaseQuantity} handleAddToWishlist={handleAddToWishlist} wishlistData={wishlistData}
                    setIsTooltipVisible={setIsTooltipVisible} isTooltipVisible={isTooltipVisible} setIsDescriptionOpen={setIsDescriptionOpen} isDescriptionOpen={isDescriptionOpen}
                    descriptionRef={descriptionRef} similarItems={similarItems} visible={visible} setVisible={setVisible} />
            </div>
        </>
    )
}