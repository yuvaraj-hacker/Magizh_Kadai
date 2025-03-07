import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getallcategory } from "../../admin/shared/services/apicategory/apicategory";
import toast from "react-hot-toast";
import { savecartitems, updatecartItem } from "../../shared/services/cart/cart";
import { getallproducts } from "../../shared/services/apiproducts/apiproduct";
import useAuth from "../../shared/services/store/useAuth";
import useCart from "../../shared/services/store/useCart";
import apiurl from "../../shared/services/apiendpoint/apiendpoint";
import { Link } from "react-router-dom";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'
import { SyncLoader } from "react-spinners";
// import toast from "react-hot-toast";
// import { deletecartItem, savecartitems, updatecartItem } from "../../shared/services/cart/cart";


const HomrProducts = () => {

    const [price, setPrice] = useState([0, 12000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const [categories, setCategories] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [isSidebaropen, setIssidebaropen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userdetails } = useAuth();
    // const { addToCart, cartItems, increaseQuantity, updateTotalCartItems } = useCart();
    const { addToCart, cartItems, removeItem, decreaseQuantity, increaseQuantity, updateTotalCartItems } = useCart();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ? searchParams.get("category").split(",") : []);
    const queryParams = new URLSearchParams(location.search);
    const selectedSubcategory = queryParams.get("subcategory");
    const placements = ["inside", "outside", "outside-left"];
    const [wishlistData, setWishlistData] = useState([]);
    const [Sort, setSort] = useState(null);
    const sidebarRef = useRef(null);
    const selectedCategories = searchParams.get("category") ? searchParams.get("category").split(",") : [];
    const navigate = useNavigate();
    let isMounted = true;
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const { pathname, search } = location;
    const shouldShowFilter = pathname === "/products" && !search;


    const handleDiscountChange = (discount) => {
        setSelectedDiscounts((prev) =>
            prev.includes(discount) ? prev.filter(d => d !== discount) : [...prev, discount]
        );
    };
    const getAllProducts = useCallback(async () => {
        try {
            let params = { globalfilter: "" };
            const categoryParam = queryParams.get("category");
            if (categoryParam) {
                const categories = categoryParam.split(",");
                if (categories.length > 0) {
                    params["Category"] = { $in: categories };
                }
            }
            if (queryParams.get("subcategory")) {
                params["Sub_Category"] = queryParams.get("subcategory");
            }
            if (Sort !== null) {
                params["sort"] = Sort;
            }
            if (price.length === 2) {
                params["Sale_Price"] = { $gte: Number(price[0]), $lte: Number(price[1]), };
            }
            if (selectedDiscounts.length > 0) {
                const minDiscount = Math.min(...selectedDiscounts.map(Number));
                if (!isNaN(minDiscount)) {
                    params["Discount"] = { $gte: minDiscount };
                }
            }
            const res = await getallproducts(params);
            setIsLoading(true);
            setProducts(res.resdata);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products", {
                icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-yellow-500"   >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 0 0 1.732-3L13.732 5a2 2 0 0 0-3.464 0L3.197 16a2 2 0 0 0 1.732 3z" />
                </svg>
                ),
            });
        } finally {
            setIsLoading(false);
        }
    }, [selectedCategories, queryParams, selectedSubcategory, Sort, priceChanged, selectedDiscounts]);
    useEffect(() => {
        getAllProducts();
    }, [queryParams.get("category"), queryParams.get("subcategory"), selectedDiscounts, price, Sort]);
    const clearFilters = () => {
        setSort(null);
        setPrice([0, 12000]);
        setSelectedDiscounts([]);
        navigate("/products", { replace: true });
        getAllProducts();
    };



    const getCurrentCartQuantity = () => {
        const cartItem = cartItems.find(item => item._id === product?._id);
        return cartItem ? cartItem.Quantity : 0;
    };



    const handleIncreaseQuantity = async () => {
        const currentQuantity = getCurrentCartQuantity();

        if (currentQuantity >= product.QTY) {
            toast.error(`Limit reached! Maximum allowed: ${product?.QTY}`, { icon: "📢" });
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




    // const allCategories = useCallback(async () => {
    //     setIsLoading(true);
    //     try {
    //         const res = await getAllCategories();
    //         setCategories(res.resdata);
    //     } catch (error) {
    //         console.error("Failed to fetch categories:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, []);

    // useEffect(() => {
    //     allCategories();
    // }, [allCategories]);

    const allDiscounts = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getallproducts();
            setDiscount(res.resdata);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        allDiscounts();
    }, [allDiscounts]);

    // const getWishlistItem = useCallback(async () => {
    //     var res = await getWishlistItems(userdetails?.Email);
    //     setWishlistData(res.response);
    // }, [selectedCategory, selectedSubcategory, Sort]);
    // useEffect(() => {
    //     if (isMounted) {
    //         getAllProducts();
    //         getWishlistItem();
    //     }
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [selectedCategory, selectedSubcategory, Sort]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get("category");
        if (categoryParam == "Fresh Flowers & Leaves") {
            setVisible(true);
        }
        if (categoryParam) {
            setSelectedCategory(decodeURIComponent(categoryParam));
        } else {
            setSelectedCategory("");
        }
    }, [location.search, categories]);

    // const getAllCategories = useCallback(async () => {
    //     try {
    //         const res = await getallcategory();
    //         setCategories(res?.resdata || []);
    //     } catch (error) {
    //         console.error("Error fetching categories:", error);
    //     }
    // }, []);

    // useEffect(() => {
    //     let isMounted = true;
    //     const fetchCategories = async () => {
    //         if (isMounted) {
    //             await getAllCategories();
    //         }
    //     };

    //     fetchCategories();
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [getAllCategories]);


    const handleAddToCart = async (prod) => {
        try {
            const cartItemsFromStore = cartItems || [];
            const existingCartItem = cartItemsFromStore.find(
                (item) => item._id === prod._id
            );
            const isFreshProduce = prod.Category === "Fresh Produce";
            const increment = isFreshProduce ? 0.5 : 1;

            // Get current cart quantity
            const currentQuantity = existingCartItem ? existingCartItem.Quantity : 0;
            const updatedQuantity = currentQuantity + increment;

            // ✅ Prevent exceeding stock limit
            if (updatedQuantity > prod.QTY) {
                toast.error(`Limit reached! ${prod?.QTY}`, { icon: "📢" });
                return;
            }

            if (existingCartItem) {
                // ✅ Update cart item if it already exists
                if (userdetails?.Email) {
                    await updatecartItem(
                        existingCartItem._id,
                        prod._id,
                        updatedQuantity,
                        userdetails.Email
                    );
                }
                increaseQuantity(prod._id);
                toast.success(`Quantity increased! (${updatedQuantity})`);
            } else {
                // ✅ Add new product to cart
                const initialQuantity = isFreshProduce ? 0.5 : 1;
                if (userdetails?.Email) {
                    const cartData = {
                        productId: prod._id,
                        Email: userdetails.Email,
                        Quantity: initialQuantity,
                    };
                    await savecartitems(cartData);
                }
                addToCart({ ...prod, Quantity: initialQuantity });
                toast.success(`Product added to cart!   (${initialQuantity})`);
                updateTotalCartItems();
            }
        } catch (error) {
            toast.error("Failed to add product to cart.");
            console.error("Error adding product to cart:", error);
        }
    };

    // const handleAddToCart = async (product) => {
    //     if (product.QTY === 0) {
    //         toast.error("This item is currently out of stock!");
    //         return;
    //     }
    //     if (cartItems.some(item => item._id === product._id)) {
    //         toast.error("Product is already in your cart!");
    //         return;
    //     }
    //     try {
    //         if (userdetails?.Email) {
    //             const cartData = { productId: product._id, Email: userdetails.Email, Quantity: 1 };
    //             await savecartitems(cartData);
    //         }
    //         addToCart(product);
    //         toast.success("Product added to cart successfully!");
    //         updateTotalCartItems()
    //     } catch (error) {
    //         toast.error("Failed to add product to cart.");
    //         console.error("Error adding product to cart:", error);
    //     }
    // };
    const handleAddToWishlist = async (prod) => {
        if (userdetails?.Email) {
            if (wishlistData?.some((item) => item.productId?._id === prod._id)) {
                await RemoveWishlistItem({
                    Email: userdetails?.Email,
                    productId: prod._id,
                });
                await getWishlistItem();
            } else {
                const wishlistDatas = {
                    productId: prod._id,
                    Email: userdetails.Email,
                    Quantity: 1,
                };
                await savewishitems(wishlistDatas);
                await getWishlistItem();
                toast.success("Added to Wishlist!");
            }
        } else {
            setVisible1(true);
            toast.error("Please log in to save items!", {
                position: "bottom-center",
                icon: "📢",
            });
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // Close sidebar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIssidebaropen(false);
            }
        }
        if (isSidebaropen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebaropen, setIssidebaropen]);

    const categoryOrder = [
        "Bottles",
        "Home Utilities",
        "Laptop/Mobile Accessories",
        "Bathroom Accessories",
        "Kitchen Accessories",
        "Others",
    ];

    useEffect(() => {
        if (products.length > 0) { // Ensure products are loaded
            const scrollPosition = sessionStorage.getItem("scrollPosition");
            if (scrollPosition !== null) {
                setTimeout(() => {
                    window.scrollTo(0, parseInt(scrollPosition, 10));
                    sessionStorage.removeItem("scrollPosition"); // Clear after restoring
                }, 100); // Add slight delay to ensure page is ready
            }
        }
    }, [products]);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <SyncLoader color="#024A34" />
                </div>
            ) : (
                <section className="">
                    <div className="relative md:px-2 px-1 pb-2 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 overflow-y-auto  3xl:grid-cols-7  2xl:grid-cols-6 xl:grid-cols-5 gap-x-3  ">
                        {[...products]
                            .sort((a, b) => {
                                if (a.Category === "Drinkware/Bottles" && b.Category !== "Drinkware/Bottles") return -1;
                                if (b.Category === "Drinkware/Bottles" && a.Category !== "Drinkware/Bottles") return 1;
                                // Inside "Drinkware/Bottles", move quantity 0 products last
                                if (a.Category === "Drinkware/Bottles" && b.Category === "Drinkware/Bottles") {
                                    if (a.QTY === 0) return 1;
                                    if (b.QTY === 0) return -1;
                                }
                                // For other categories, move quantity 0 products last
                                if (a.QTY === 0) return 1;
                                if (b.QTY === 0) return -1;
                                return 0;
                            }).map((prod, i) => (
                                <Link to={`/product-details/${prod._id}`} state={{ product: prod }} key={i} onClick={() => sessionStorage.setItem("scrollPosition", window.scrollY)}>
                                    <div className="relative group ">
                                        <div className="w-full     bg-white flex justify-between flex-col relative mb-5 shadow-md border  rounded-md hover:shadow-md duration-300  md:h-[370px]   h-[250px] ">
                                            {/* wishlist & cart */}
                                            <div className="absolute top-2 right-2 lg:absolute z-20 mb-1 flex justify-end lg:justify-center items-center md:gap-2   font-semibold      duration-300">
                                                {prod.QTY > 0 && prod.QTY !== null && prod.Stock === 'Stock' && (
                                                    <>
                                                        {cartItems.some(item => item._id === prod._id) ? (
                                                            // Show Increment & Decrement (or Delete) Controls
                                                            <div onClick={(e) => { e.preventDefault() }} className="flex  items-center md:gap-2 gap-1 bg-gray-100   rounded-full  ">
                                                                {cartItems.find(item => item._id === prod._id)?.Quantity === 1 ? (
                                                                    // Show Delete Icon if Quantity is 1
                                                                    <button
                                                                        onClick={(e) => { e.preventDefault(); removeItem(prod._id); }}
                                                                        className="text-red-500 hover:text-red-700    p-1 px-2"
                                                                    >
                                                                        <i class="fi fi-rr-trash flex items-center text-sm  "></i>
                                                                    </button>
                                                                ) : (
                                                                    // Show Minus Button if Quantity > 1
                                                                    <button
                                                                        onClick={(e) => { e.preventDefault(); decreaseQuantity(prod._id); }}
                                                                        className="text-primary text-lg    p-1 px-2"
                                                                    >
                                                                        -
                                                                    </button>
                                                                )}
                                                                <span className="text-primary text-sm font-bold  ">
                                                                    {cartItems.find(item => item._id === prod._id)?.Quantity}
                                                                </span>

                                                                <button
                                                                    onClick={(e) => { e.preventDefault(); handleAddToCart(prod); }}
                                                                    className="  text-lg p-1 px-2  text-primary "
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            // Show Add to Cart Button if Product is NOT in Cart
                                                            <button onClick={(e) => { e.preventDefault(); handleAddToCart(prod); }} className="flex justify-center items-center   rounded-full     " >
                                                                <i className="fi fi-rr-shopping-cart-add text-base lg:text-xl  p-2 rounded-full flex items-center  bg-gray-200  text-primary duration-300"></i>
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* {getCurrentCartQuantity() === 0 ? (
                                                <button className="flex items-center justify-center gap-2 w-full md:p-5 p-2 px-6 md:text-base text-sm font-semibold text-white rounded-3xl   bg-primary transition-colors " onClick={() => handleAddToCart(product)}  >
                                                    <span> <i className="fi fi-ts-cart-minus text-white flex items-center justify-center"></i> </span>
                                                    Add to Cart
                                                </button>
                                            ) : (
                                                <button className="flex items-center justify-center gap-2 w-full md:p-5 p-2 px-6 md:text-base text-sm font-semibold text-white rounded-3xl bg-primary transition-colors">
                                                    <span> <i className="fi fi-ts-cart-minus text-white flex items-center justify-center"></i> </span>
                                                    <span className="md:mx-2">{getCurrentCartQuantity()} in cart</span>
                                                    {getCurrentCartQuantity() >= 1 ? (
                                                        <div className='flex   justify-between md:gap-2 gap-1'>
                                                            <button className=' rounded-3xl  cursor-pointer disabled:cursor-not-allowed bg-white border  disabled:bg-white/80' onClick={handleDecreaseQuantity}>
                                                                <ChevronDownIcon className="md:w-6 md:h-6 w-4 h-4 text-primary" />
                                                            </button>
                                                            <button className=' rounded-3xl bg-white border flex justify-center items-center cursor-pointer' onClick={handleIncreaseQuantity}>
                                                                <ChevronUpIcon className="md:w-6 md:h-6 w-4 h-4 text-primary " />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        </div>
                                                    )}
                                                </button>
                                            )} */}

                                            <div className="absolute z-10 top-3 left-2 lg:top-2 lg:left-2 text-[10px] lg:text-xs ">
                                                {(prod.QTY === 0 || prod.Stock === 'Out of Stock') && (
                                                    <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                                                        <p className="">Out of Stock</p>
                                                    </div>
                                                )}
                                                {(prod.QTY > 0 && prod.Discount > 0 && prod.Stock === 'Stock') && (
                                                    <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                                                        <p className="">{Math.round(prod?.Discount)}% off</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative flex items-center justify-center    overflow-hidden rounded-lg   p-1">
                                                <img key={`${i}`} src={`${apiurl()}/${prod?.Images}`.split(',')[0]} alt={`Product ${i + 1}`} className={`  object-contain  pt-1  group-hover:opacity-80 duration-300 w-full max-h-52 md:h-52 h-32 rounded-lg`} />
                                            </div>
                                            <div className=" md:px-3 md:pb-3 p-1 space-y-1">
                                                <h2 className="  text-sm text-black dark:text-white md:text-base line-clamp-2 text-left">
                                                    {prod.Product_Name}
                                                </h2>
                                                <div className=" lg:flex items-center justify-between space-y-1 flex-wrap  ">
                                                    <div className="order-1 lg:order-2">
                                                        {(prod.QTY <= 5 && prod.QTY > 0 && prod.Stock === 'Stock') && (
                                                            <div className="bg-[#f1aa59] p-1 text-white md:text-[9px] text-[7px] rounded-full w-fit  ">
                                                                <p className="">Limited Stock</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 order-2 lg:order-1">
                                                        {prod.Discount > 0 && (
                                                            <>  <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
                                                                ₹{parseFloat(prod?.Sale_Price)}
                                                            </h3>
                                                                {/* Original Price */}
                                                                <h3 className="md:text-sm text-xs text-third line-through  dark:text-white">
                                                                    ₹{parseFloat(prod?.Regular_Price)}
                                                                </h3>

                                                            </>
                                                        )}
                                                        {prod?.Discount === 0 && prod?.Sale_Price > 0 && (
                                                            <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
                                                                ₹{parseFloat(prod?.Sale_Price)}
                                                            </h3>
                                                        )}
                                                    </div>


                                                </div>
                                                <div className="text-start  ">
                                                    <button className="text-white md:p-2 p-1 py-2 w-full md:text-base text-xs bg-primary rounded-3xl">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default HomrProducts;