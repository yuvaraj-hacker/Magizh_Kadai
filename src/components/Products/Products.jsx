import { useCallback, useEffect, useRef, useState } from "react";
import Headpanel from "../../shared/Components/Products/Headpanel";
import Items from "../../shared/Components/Products/Items";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getallcategory } from "../../admin/shared/services/apicategory/apicategory";
import toast from "react-hot-toast";
import { savecartitems, updatecartItem } from "../../shared/services/cart/cart";
import { getallproducts } from "../../shared/services/apiproducts/apiproduct";
import useAuth from "../../shared/services/store/useAuth";
import useCart from "../../shared/services/store/useCart";
import PopupModal from "../../shared/Components/Products/PopupModal";
// import {
//     getWishlistItems,
//     RemoveWishlistItem,
//     savewishitems,
// } from "../../shared/services/wishlist/wishlist";
import RegisterContinueGoogle from "../../shared/Components/Register-ContiGoogle/RegisterContiGoogle";
import apiurl from "../../shared/services/apiendpoint/apiendpoint";
import { apigetallcategory } from "../../shared/services/apicategory/apicategory";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'
import { SyncLoader } from "react-spinners"
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";



const Products = () => {
    const [price, setPrice] = useState([0, 12000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const [categories, setCategories] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [isSidebaropen, setIssidebaropen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userdetails } = useAuth();
    const { addToCart, cartItems, removeItem, decreaseQuantity, increaseQuantity, updateTotalCartItems } = useCart();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState([]);
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

    const allCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res.resdata);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        allCategories();
    }, [allCategories]);

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

    const getAllCategories = useCallback(async () => {
        try {
            const res = await getallcategory();
            setCategories(res?.resdata || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            if (isMounted) {
                await getAllCategories();
            }
        };

        fetchCategories();
        return () => {
            isMounted = false;
        };
    }, [getAllCategories]);

    // const handleAddToCart = async (prod) => {
    //     try {
    //         const cartItemsFromStore = cartItems || [];
    //         const existingCartItem = cartItemsFromStore.find(item => item._id === prod._id);

    //         if (existingCartItem) {
    //             const updatedQuantity = existingCartItem.Quantity + 1;

    //             if (userdetails?.Email) {
    //                 await updatecartItem(existingCartItem._id, prod._id, updatedQuantity, userdetails.Email);
    //             }
    //             increaseQuantity(prod._id);
    //             toast.success(`Quantity increased! ${prod.Product_Name}: ${updatedQuantity}`);
    //         } else {
    //             if (userdetails?.Email) {
    //                 const cartData = { productId: prod._id, Email: userdetails.Email, Quantity: 1 };
    //                 await savecartitems(cartData);
    //             }

    //             addToCart({ ...prod, Quantity: 1 });
    //             toast.success(`Product added to cart! ${prod.Product_Name}`);
    //             // const currentTotal = parseInt(localStorage.getItem('TotalCartItems') || '0');
    //             // localStorage.setItem('TotalCartItems', (currentTotal + 1).toString());
    //             updateTotalCartItems()
    //         }
    //     } catch (error) {
    //         toast.error("Failed to add product to cart.");
    //         console.error("Error adding product to cart:", error);
    //     }
    // };


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
                toast.success(`Product added to cart! (${initialQuantity})`);
                updateTotalCartItems();
            }
        } catch (error) {
            toast.error("Failed to add product to cart.");
            console.error("Error adding product to cart:", error);
        }
    };
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
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <SyncLoader color="#024A34" />
                </div>
            ) : (
                <section className="max-w-full mx-auto" >
                    <div className="max-w-[1900px] mx-auto flex  min-h-[60vh] relative dark:bg-black">
                        <div ref={sidebarRef}
                            className={`lg:top-[120px] w-[300px]  bg-gray-100 lg:min-h-screen  h-screen top-0 -right-[100%] fixed lg:overflow-y-visible overflow-y-auto lg:z-40 z-50 duration-300 ${isSidebaropen ? "right-0" : "-right-[100%]"} custom-scrollbar flex flex-col`}>
                            <div className="h-screen overflow-y-auto ">
                                <div className=" block p-2 mt-4">
                                    <div className="flex justify-end">
                                        <i className="fi fi-rs-circle-xmark cursor-pointer text-xl" onClick={() => setIssidebaropen(false)}   ></i>
                                    </div>
                                </div>
                                <div className=" border-b p-4 flex justify-between items-center">
                                    <div className=" text-sm text-black ">FILTERS</div>
                                    <div className=" text-sm cursor-pointer text-blue-400  bg-white hover:bg-gray-50 p-2" onClick={clearFilters}>
                                        CLEAR ALL
                                    </div>
                                </div>
                                <div className="space-y-2 p-4 border-b ">
                                    <div className=" text-sm text-gray-600 ">CATEGORIES</div>
                                    <div className={` max-h-[50vh] w-64 cursor-default overflow-auto`}  >
                                        <ul className=" text-xs ">
                                            {categories.map((category) => {
                                                if (category.Category_Name === "Everything" || category.Category_Name === "All Categories") return null;
                                                const isChecked = selectedCategories.includes(category.Category_Name);
                                                let updatedCategories = [...selectedCategories];
                                                if (isChecked) {
                                                    updatedCategories = updatedCategories.filter((cat) => cat !== category.Category_Name);
                                                } else { updatedCategories.push(category.Category_Name); }
                                                const queryString = updatedCategories.length > 0 ? `?category=${updatedCategories.join(",")}` : "";
                                                const linkTo = `/products${queryString}`;
                                                return (
                                                    <li key={category._id} className="group py-1 w-fit">
                                                        <Link to={linkTo}>
                                                            <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden w-fit">
                                                                <input type="checkbox" className="cursor-pointer" checked={isChecked} readOnly />
                                                                <h5 className="whitespace-pre-wrap text-gray-500">
                                                                    {category.Category_Name}
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-2 p-4 border-b grid grid-cols-1 w-full">
                                    <h1 className="text-sm text-gray-600 uppercase">Price</h1>
                                    <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-md text-center text-sm text-gray-700 font-medium">
                                        <span className="text-primary font-semibold">₹{price[0]}</span> -
                                        <span className="text-primary font-semibold"> ₹{price[1]}</span>
                                    </div>
                                    <div className="flex justify-content-center py-3">
                                        <div className="flex justify-center items-center px-5 w-full" onMouseUp={() => setPriceChanged(price)}>
                                            <Slider range={true} marks={{ 0: "₹0", 12000: " ₹12000" }} step={500} min={0} max={12000} value={price} onChange={(price) => { setPrice(price) }}
                                                handleRender={renderProps => {
                                                    return (<Tooltip overlay={`₹${renderProps.props['aria-valuenow']}`}>
                                                        <div {...renderProps.props}></div>
                                                    </Tooltip>
                                                    )
                                                }}
                                                styles={{ track: { backgroundColor: "#024A34" }, handle: { backgroundColor: "#000", borderColor: "#000" }, rail: { backgroundColor: "#024A34" } }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 p-4 border-b">
                                    <h1 className="text-sm text-gray-600 uppercase">Discount</h1>
                                    <div className='text-xs space-y-2'>
                                        {[20, 30, 40, 50, 60].map((discount) => (
                                            <label key={discount} className="flex gap-2 justify-start items-center p-0.5 overflow-hidden cursor-pointer w-fit">
                                                <input type="checkbox" className='text-white border-none' checked={selectedDiscounts.includes(discount)} onChange={() => handleDiscountChange(discount)} />
                                                <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">
                                                    {discount}% or more
                                                </h5>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="  gap-1">
                                    <div className="relative ">
                                        <Items removeItem={removeItem} decreaseQuantity={decreaseQuantity} cartItems={cartItems} isLoading={isLoading} queryParams={queryParams} products={products} placements={placements} setIssidebaropen={setIssidebaropen} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist} setSort={setSort} wishlistData={wishlistData} scrolled={scrolled} />{" "}
                                    </div>
                                    {/* <div className="col-span-2">
                            <FilterSidebar className="col-span-2" togfilter={togfilter} settog={settog} tog={tog} settog2={settog2} tog2={tog2} settog3={settog3} tog3={tog3}
                                Tags={Tags} handleTagsCheckboxChange={handleTagsCheckboxChange} />
                            <div onClick={() => settogfilter(false)} className={`${togfilter ? 'translate-x-0' : '-translate-x-full'} lg:hidden h-screen w-full fixed top-0 left-0 z-20 bg-black/50`}> </div>
                            </div> */}
                                </div>
                            </div>
                            <PopupModal visible={visible} setVisible={setVisible} />
                            <RegisterContinueGoogle
                                visible={visible1}
                                setVisible={setVisible1}
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Products;
