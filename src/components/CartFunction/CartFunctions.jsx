
import { useCallback, useEffect, useState } from "react";
import CartPage from "../../shared/Components/Cart/CartPage";
import useCart from "../../shared/services/store/useCart";
import useAuth from "../../shared/services/store/useAuth";
import { useNavigate } from "react-router-dom";
import { deletecartItem, getcartItems, updatecartItem } from "../../shared/services/cart/cart";
import moment from "moment-timezone";
import { isLoggedIn } from "../../shared/services/Token/token";
import toast from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";
import { SyncLoader } from "react-spinners";

export default function CartPageFunctions() {
    const { removeItem, increaseQuantity, decreaseQuantity, setCartItem } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const { userdetails } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [updatingItems, setUpdatingItems] = useState(new Set());
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [checkoutlogin, setCheckoutlogin] = useState(false);
    const Deliverydate = localStorage.getItem('selectedDate');
    const [deliveryType, setDeliveryType] = useState('');
    const [datevisible, setDatevisible] = useState(false);
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
    const [timevisible, setTimevisible] = useState(false);
    const [selectedPickupDateTime, setSelectedPickupDateTime] = useState(null);

    const generateDates = () => {
        const today = new Date();
        const thisWeekDates = [];
        const nextWeekDates = [];

        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        // Determine the starting point based on current time
        let startIndex = 0;

        // If it's past 3 PM, start from the next day
        if (currentHour >= 15) {
            startIndex = 1;
        }

        const totalThisWeekDates = 5; // Total dates for this week
        const totalNextWeekDates = 5; // Total dates for next week
        // Generate this week's dates
        for (let i = startIndex; i < totalThisWeekDates; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            thisWeekDates.push(date);
        }
        // Generate next week's dates
        for (let i = 0; i < totalNextWeekDates; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + totalThisWeekDates + i);
            nextWeekDates.push(date);
        }

        return { thisWeekDates, nextWeekDates };
    };

    const regularCartItems = cartItems.filter(
        item => item.productId?.Category !== "Fresh Flowers & Leaves"
    );
    const flowerCartItems = cartItems.filter(
        item => item.productId?.Category === "Fresh Flowers & Leaves"
    );

    useEffect(() => {
        const savedDeliveryType = localStorage.getItem('purchaseType');
        setDeliveryType(savedDeliveryType);
    }, []);


    useEffect(() => {
        const savedDeliveryType = localStorage.getItem('purchaseType');
        setDeliveryType(savedDeliveryType);

        if (!localStorage.getItem('purchaseDateandTime')) {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            if (savedDeliveryType === 'delivery') {
                const defaultDeliveryDate = currentHour < 15 ?
                    currentTime :
                    new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1);

                setSelectedDeliveryDate(defaultDeliveryDate);
                localStorage.setItem('purchaseDateandTime', defaultDeliveryDate.toISOString());
            }
            else if (savedDeliveryType === 'pickup') {
                const suggestedPickupTime = new Date(currentTime);

                const minutes = currentTime.getMinutes() > 30 ? 0 : 30;
                const roundedHour = currentTime.getMinutes() > 30 ?
                    currentTime.getHours() + 1 :
                    currentTime.getHours();

                suggestedPickupTime.setHours(roundedHour, minutes, 0, 0);

                if (suggestedPickupTime.getHours() >= 20) {
                    suggestedPickupTime.setDate(suggestedPickupTime.getDate() + 1);
                    suggestedPickupTime.setHours(9, 0, 0, 0);
                }

                setSelectedPickupDateTime(moment(suggestedPickupTime));
                localStorage.setItem('purchaseDateandTime', suggestedPickupTime.toISOString());
            }
        } else {
            const savedDateTime = localStorage.getItem('purchaseDateandTime');
            if (savedDeliveryType === 'delivery') {
                setSelectedDeliveryDate(new Date(savedDateTime));
            } else if (savedDeliveryType === 'pickup') {
                setSelectedPickupDateTime(moment(savedDateTime));
            }
        }
    }, [deliveryType]);

    const fetchCartItemsFromBackend = useCallback(async () => {
        if (userdetails?.Email) {
            setIsLoading(true);
            const response = await getcartItems(userdetails?.Email);
            console.log(response?.response.map(resp => resp.productId))
            setCartItem(response.response.length > 0 ? response?.response.map(resp => ({ ...resp.productId, Quantity: resp.Quantity })) : [])
            setCartItems(response?.response || []);
            setIsLoading(false);
        } else {
            const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
            setCartItems(localCart);
        }
    }, [userdetails?.Email]);

    useEffect(() => {
        fetchCartItemsFromBackend();
    }, [userdetails?.Email]);

    useEffect(() => {
        fetchCartItemsFromBackend();
    }, [userdetails?.Email]);

    const { thisWeekDates, nextWeekDates } = generateDates();

    const selectDefaultDateTime = (type) => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (type === 'delivery') {
            const defaultDeliveryDate = currentHour < 15 ?
                currentTime :
                new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1);

            setSelectedDeliveryDate(defaultDeliveryDate);
            localStorage.setItem('purchaseDateandTime', defaultDeliveryDate.toISOString());
        }
        else if (type === 'pickup') {
            const suggestedPickupTime = new Date(currentTime);

            const minutes = currentTime.getMinutes() > 30 ? 0 : 30;
            const roundedHour = currentTime.getMinutes() > 30 ?
                currentTime.getHours() + 1 :
                currentTime.getHours();

            suggestedPickupTime.setHours(roundedHour, minutes, 0, 0);

            if (suggestedPickupTime.getHours() >= 20) {
                suggestedPickupTime.setDate(suggestedPickupTime.getDate() + 1);
                suggestedPickupTime.setHours(9, 0, 0, 0);
            }

            setSelectedPickupDateTime(moment(suggestedPickupTime));
            localStorage.setItem('purchaseDateandTime', suggestedPickupTime.toISOString());
        }
    };

    const hasFlowerProducts = cartItems.some(
        item => item.productId?.Category === "Fresh Flowers & Leaves"
    );

    // Modify handleDeliveryTypeChange
    const handleDeliveryTypeChange = (type) => {
        setDeliveryType(type);
        if (type === 'delivery') {
            setDatevisible(false);
            setSelectedDeliveryDate(null);
        } else if (type === 'pickup') {
            setTimevisible(false);
            setSelectedPickupDateTime(null);
        }

        // If flower products are present, adjust date selection
        if (hasFlowerProducts) {
            // For flower products, set date one week later
            const flowerDate = moment().add(7, 'days').toDate();
            setSelectedDeliveryDate(flowerDate);
            localStorage.setItem('purchaseDateandTime', flowerDate.toISOString());
            localStorage.setItem('purchaseFlowerDateandTime', flowerDate.toISOString());
        } else {
            selectDefaultDateTime(type);
        }

        localStorage.setItem('purchaseType', type);
    };

    // const handleDeliveryTypeChange = (type) => {
    //     setDeliveryType(type);
    //     if (type === 'delivery') {
    //         setDatevisible(false);
    //         setSelectedDeliveryDate(null);

    //     } else if (type === 'pickup') {
    //         setTimevisible(false);
    //         setSelectedPickupDateTime(null);
    //     }
    //     selectDefaultDateTime(type);
    //     localStorage.setItem('purchaseType', type);
    // };

    const handleDateClick = (date) => {
        setSelectedDeliveryDate(date);
        localStorage.setItem('purchaseDateandTime', date.toISOString());
        setDatevisible(false);
    };



    const isSelected = (date) => {
        return selectedDeliveryDate && date.toDateString() === selectedDeliveryDate.toDateString();
    };


    const handlePickupTimeChange = (date, time) => {
        const selectedDateTime = moment(date).hours(time.split(':')[0]).minutes(time.split(':')[1]);
        setSelectedPickupDateTime(selectedDateTime);
        localStorage.setItem('purchaseDateandTime', selectedDateTime.toISOString());
        setTimevisible(false);
    };

    // Check if a pickup time is selected
    const isPickupTimeSelected = (date, time) => {
        if (!selectedPickupDateTime) return false;

        const selectedDate = moment(selectedPickupDateTime);
        const comparisonDate = moment(date);

        return selectedDate.isSame(comparisonDate, 'day') &&
            selectedDate.format('HH:mm') === time;
    };

    // const handleQuantityChange = async (productId, action) => {
    //     const item = cartItems.find((cartItem) => cartItem._id === productId);
    //     if (!item) {
    //         toast.error("Item not found");
    //         return;
    //     }

    //     setUpdatingItems((prev) => new Set([...prev, productId]));

    //     try {
    //         const currentQuantity = item.Quantity;
    //         let newQuantity;
    //         if (action === "increase") {
    //             if ((item?.Quantity >= item?.productId?.QTY) || (item?.Quantity >= item?.QTY)) {
    //                 toast.error('Limit reached!', { icon: '📢' });
    //             }
    //             else {
    //                 newQuantity = currentQuantity + 1
    //             }
    //         }
    //         else {
    //             newQuantity = currentQuantity - 1
    //         }


    //         if (newQuantity <= 0) {
    //             await handleRemoveItem(productId);
    //             return;
    //         }

    //         if (userdetails?.Email) {
    //             await updatecartItem(item._id, item.productId?._id || item._id, newQuantity, userdetails.Email);
    //         }

    //         const updatedCart = cartItems.map((cartItem) => cartItem._id === productId ? { ...cartItem, Quantity: newQuantity } : cartItem);

    //         console.log(item)

    //         setCartItems(updatedCart);
    //         if (action === 'increase') {
    //             increaseQuantity(item?.productId?._id || item?._id);
    //         } else {
    //             decreaseQuantity(item?.productId?._id || item?._id);
    //         }
    //         toast.success("Quantity updated successfully");

    //         setUpdatingItems((prev) => {
    //             const newSet = new Set(prev);
    //             newSet.delete(productId);
    //             return newSet;
    //         });

    //     } catch (error) {
    //         console.error("Error updating quantity:", error);
    //         toast.error("Failed to update quantity");
    //     }
    // };

    const handleQuantityChange = async (productId, action) => {
        const item = cartItems.find((cartItem) => cartItem._id === productId);
        if (!item) {
            toast.error("Item not found");
            return;
        }
        setUpdatingItems((prev) => new Set([...prev, productId]));

        try {
            const currentQuantity = item.Quantity;
            const isFreshProduce = item.productId?.Category === "Fresh Produce" || item.Category === "Fresh Produce";

            // Only use increment for Fresh Produce items
            const increment = isFreshProduce ? 0.5 : 1;
            let newQuantity;

            if (action === "increase") {
                if ((item?.Quantity >= item?.productId?.QTY) || (item?.Quantity >= item?.QTY)) {
                    toast.error('Limit reached!', { icon: '📢' });
                    setUpdatingItems((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(productId);
                        return newSet;
                    });
                    return;
                } else {
                    // For Fresh Produce, ensure we're always using 0.5 lb increments
                    if (isFreshProduce) {
                        // If current quantity is 0 (new item), start at 0.5
                        newQuantity = currentQuantity === 0 ? 0.5 : currentQuantity + increment;
                    } else {
                        newQuantity = currentQuantity + increment;
                    }
                }
            } else {
                // For decreasing quantity
                if (isFreshProduce) {
                    // If current quantity is 0.5, remove item
                    newQuantity = currentQuantity - increment;
                } else {
                    newQuantity = currentQuantity - increment;
                }
            }

            // Specific check for Fresh Produce minimum quantity
            if (isFreshProduce && newQuantity < 0.5) {
                await handleRemoveItem(productId);
                return;
            } else if (!isFreshProduce && newQuantity <= 0) {
                await handleRemoveItem(productId);
                return;
            }

            if (userdetails?.Email) {
                await updatecartItem(item._id, item.productId?._id || item._id, newQuantity, userdetails.Email);
            }

            const updatedCart = cartItems.map((cartItem) =>
                cartItem._id === productId
                    ? { ...cartItem, Quantity: Number(newQuantity.toFixed(1)) }
                    : cartItem
            );

            setCartItems(updatedCart);

            if (action === 'increase') {
                increaseQuantity(item?.productId?._id || item?._id);
            } else {
                decreaseQuantity(item?.productId?._id || item?._id);
            }

            const successMessage = isFreshProduce
                ? `Quantity updated to ${newQuantity.toFixed(1)} lb`
                : "Quantity updated successfully";
            toast.success(successMessage);

            setUpdatingItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });

        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
            setUpdatingItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    const handleRemoveItem = async (productId) => {
        const item = cartItems.find((cartItem) => cartItem._id === productId);
        if (!item) return;
        setUpdatingItems((prev) => new Set([...prev, productId]));
        try {
            if (userdetails?.Email) {
                await deletecartItem(item._id);
            }
            const updatedCart = cartItems.filter((cartItem) => cartItem._id !== productId);
            setCartItems(updatedCart);

            if (!userdetails?.Email) {
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            }
            removeItem(item.productId?._id || item._id);
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item");
        } finally {
            setUpdatingItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.productId?.Sale_Price || item.Sale_Price || 0;
            return total + price * item.Quantity;
        }, 0);
    };

    const calculateSubtotalRegular = () => {
        return cartItems.reduce((total, item) => {
            const price = item.productId?.Regular_Price || item.Regular_Price || 0;
            return total + price * item.Quantity;
        }, 0);
    };

    const calculateTotalDiscount = () => {
        return cartItems.reduce((totalDiscount, item) => {
            const regularPrice = item.productId?.Regular_Price || item.Regular_Price || 0;
            const salePrice = item.productId?.Sale_Price || item.Sale_Price || 0;
            const quantity = item.Quantity ?? 1;

            const discountAmount = (regularPrice - salePrice) * quantity;

            return totalDiscount + discountAmount;
        }, 0);
    };


    const deliveryFee = 0.00;
    const subtotal = calculateSubtotal();
    const subtotalRegular = calculateSubtotalRegular();
    const totalDiscount = calculateTotalDiscount();
    const finalTotal = subtotal;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <SyncLoader color="#024A34" />
            </div>
        )
    }

    const goToCheckout = () => {
        // if (!deliveryType) {
        //     toast.error("Please select a delivery method");
        //     return;
        // }
        // if (deliveryType === 'delivery' && !selectedDeliveryDate) {
        //     toast.error("Please select a delivery date");
        //     return;
        // }
        // if (deliveryType === 'pickup' && !selectedPickupDateTime) {
        //     toast.error("Please select a pickup time");
        //     return;
        // }
        const totalItems = cartItems.reduce((total, item) => total + item.Quantity, 0);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("subtotal", subtotal);
        localStorage.setItem("finalTotal", finalTotal);
        localStorage.setItem("totalItems", totalItems);
        if (isLoggedIn() || localStorage.getItem('loginType') === 'Guest') {
            navigate("/checkout");
        } else {
            setCheckoutlogin(true)
            setShowLoginModal(true);
        }
    };

    // after login
    // const goToCheckout = () => {
    //     console.log("Cart Items:", cartItems);
    //     const totalItems = cartItems.reduce((total, item) => total + item.Quantity, 0);
    //     const subtotal = cartItems.reduce((total, item) => total + item.productId.Sale_Price * item.Quantity, 0);
    //     const finalTotal = subtotal - totalDiscount;
    //     localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //     localStorage.setItem("subtotal", subtotal);
    //     localStorage.setItem("finalTotal", finalTotal);
    //     localStorage.setItem("totalItems", totalItems);
    //     let message = "New Quote Request:\n\n";
    //     cartItems.forEach((product, index) => {
    //         const productTotal = product.productId.Discount > 0 ? ((product.productId.Sale_Price - (product.productId.Sale_Price * product.productId.Discount) / 100) * product.Quantity).toFixed(2) : (product.productId.Sale_Price * product.Quantity).toFixed(2);
    //         message += `${index + 1}.${product.productId.Product_Name}\n`;
    //         message += `Quantity: ${product.Quantity}\n`;
    //         message += `Price: ₹${productTotal}\n`;
    //         message += `Link: http://192.168.29.175:5173/product-details/${product._id}\n\n`;
    //     });
    //     message += `Order Summary:\n`;
    //     message += `Total Items: ${totalItems}\n`;
    //     message += `Final Total: ₹${finalTotal.toFixed(2)}\n`;
    //     const whatsappUrl = `https://wa.me/+918754720718?text=${encodeURIComponent(message)}`;
    //     window.open(whatsappUrl, "_blank");
    // };

    // before login
    const goToQuote = () => {
        const totalItems = cartItems.reduce((total, item) => total + item.Quantity, 0);
        const subtotal = cartItems.reduce((total, item) => total + item.Sale_Price * item.Quantity, 0);
        const finalTotal = subtotal;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("subtotal", subtotal);
        localStorage.setItem("finalTotal", finalTotal);
        localStorage.setItem("totalItems", totalItems);
        let message = "New Order Request:\n\n";
        cartItems.forEach((product, index) => {
            const productTotal = (product.Sale_Price * product.Quantity);
            message += `${index + 1}.${product.Product_Name}\n`;
            message += `Quantity: ${product.Quantity}\n`;
            message += `Price: ₹${productTotal}\n`;
            message += `Link: https://www.magizhkadai.com/product-details/${product._id}\n\n`;
        });
        message += `Order Summary:\n`;
        message += `Total Items: ${totalItems}\n`;
        message += `Final Total: ₹${finalTotal}\n`;
        const whatsappUrl = `https://wa.me/+918925035367?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleDeliveryDateClick = () => {
        deliveryType === 'delivery' ? setDatevisible(true) : deliveryType === 'pickup' ? setTimevisible(true) : null;
    };

    const formattedDate = selectedDeliveryDate
        ? moment(selectedDeliveryDate).format('MMMM DD, YYYY')
        : 'Select a delivery date';

    const formattedPickupTime = selectedPickupDateTime
        ? moment(selectedPickupDateTime).format('MMMM DD, YYYY [at] h:mm A')
        : 'Select a pickup time';


    const renderDeliveryPrompt = () => {
        if (!deliveryType) {
            return (
                <div className="p-4 mb-4 border-l-4 border-yellow-400 bg-yellow-50">
                    <p className="font-semibold text-yellow-700">
                        Please select your preferred delivery method (Pickup or Delivery)
                    </p>
                </div>
            );
        }

        if (deliveryType === 'delivery' && !selectedDeliveryDate) {
            return (
                <div className="p-4 mb-4 border-l-4 border-yellow-400 bg-yellow-50">
                    <p className="font-semibold text-yellow-700">
                        Please select a delivery date
                    </p>
                </div>
            );
        }
        if (deliveryType === 'pickup' && !selectedPickupDateTime) {
            return (
                <div className="p-4 mb-4 border-l-4 border-yellow-400 bg-yellow-50">
                    <p className="font-semibold text-yellow-700">
                        Please select a pickup time
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Magizh Kadai - Your one-stop shop for quality products online.</title>
                    <meta name="keywords" content="Magizh Kadai, online shopping, best deals, quality products, affordable prices, buy online, e-commerce store" />
                    <meta name="description" content="Shop a diverse range of quality products at Magizh Kadai. Enjoy the best deals, secure payments, fast delivery, and a seamless online shopping experience." />
                    <meta name="author" content="Magizh Kadai" />
                    <meta name="robots" content="index, follow" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Magizh Kadai - Your One-Stop Online Store" />
                    <meta property="og:description" content="Shop a diverse range of quality products at Magizh Kadai. Enjoy the best deals, secure payments, fast delivery, and a seamless online shopping experience." />
                    <meta property="og:url" content="https://www.magizhkadai.com/" />
                    <meta property="og:image" content="https://www.magizhkadai.com/images/og/og-image.jpeg" />
                </Helmet>
            </HelmetProvider>


                <CartPage cartItems={cartItems} renderDeliveryPrompt={renderDeliveryPrompt} isLoading={isLoading} subtotalRegular={subtotalRegular} goToCheckout={goToCheckout} deliveryType={deliveryType} handleDeliveryTypeChange={handleDeliveryTypeChange}
                    handleDeliveryDateClick={handleDeliveryDateClick} formattedDate={formattedDate} formattedPickupTime={formattedPickupTime} navigate={navigate}
                    updatingItems={updatingItems} handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} subtotal={subtotal} totalDiscount={totalDiscount}
                    goToQuote={goToQuote} finalTotal={finalTotal} timevisible={timevisible} setTimevisible={setTimevisible} handlePickupTimeChange={handlePickupTimeChange}
                    isPickupTimeSelected={isPickupTimeSelected} datevisible={datevisible} setDatevisible={setDatevisible} thisWeekDates={thisWeekDates} nextWeekDates={nextWeekDates}
                    handleDateClick={handleDateClick} isSelected={isSelected} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} checkoutlogin={checkoutlogin} />




        </>
    )
}