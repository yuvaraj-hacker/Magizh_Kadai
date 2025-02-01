import { useCallback, useEffect, useState } from 'react';
import Headpanel from '../../shared/Components/Products/Headpanel'
import Items from '../../shared/Components/Products/Items'
import { useLocation } from 'react-router-dom';
import { getallcategory } from '../../admin/shared/services/apicategory/apicategory';
import toast from 'react-hot-toast';
import { savecartitems, updatecartItem } from '../../shared/services/cart/cart';
import { getallproducts } from '../../shared/services/apiproducts/apiproduct';
import useAuth from '../../shared/services/store/useAuth';
import useCart from '../../shared/services/store/useCart';
import PopupModal from '../../shared/Components/Products/PopupModal';
import { getWishlistItems, RemoveWishlistItem, savewishitems } from '../../shared/services/wishlist/wishlist';
import RegisterContinueGoogle from '../../shared/Components/Register-ContiGoogle/RegisterContiGoogle';
import apiurl from '../../shared/services/apiendpoint/apiendpoint';
import { apigetallcategory } from '../../shared/services/apicategory/apicategory';
import { Link } from 'react-router-dom';
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

const Products = () => {
    const [value, setValue] = useState(50);
    const [categories, setCategories] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [isSidebaropen, setIssidebaropen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userdetails } = useAuth();
    const { addToCart, cartItems, increaseQuantity, updateTotalCartItems } = useCart()
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ? searchParams.get("category").split(",") : []);
    const queryParams = new URLSearchParams(location.search);
    const selectedSubcategory = queryParams.get('subcategory');
    const placements = ["inside", "outside", "outside-left"];
    const [wishlistData, setWishlistData] = useState([]);
    const [opencategories, setOpenCategories] = useState(false);
    const [Sort, setSort] = useState(null);
    const selectedCategories = searchParams.get("category") ? searchParams.get("category").split(",") : [];
    const selectedDiscount = searchParams.get("discount") ? searchParams.get("discount").split(",") : [];
    // const selectedCategory = searchParams.get("category") || "All Categories";

    let isMounted = true;

    // const getAllProducts = useCallback(async () => {
    //     setIsLoading(true);
    //     const res = await getallproducts({ Category: queryParams.get('category'), Sub_Category: queryParams.get('subcategory'), Sale_Price: Sort });
    //     setProducts(res.resdata);
    //     setIsLoading(false);
    // }, [selectedCategories, queryParams, selectedSubcategory, Sort]);
    const getAllProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            // Initialize base params
            let params = {
                globalfilter: ''
            };
            // Handle category filtering
            const categoryParam = queryParams.get('category');
            if (categoryParam) {
                // For multiple categories, we need to use $in operator
                const categories = categoryParam.split(',');
                if (categories.length > 0) {
                    params['Category'] = { $in: categories };
                }
            }
            const discountParam = queryParams.get('discount');
            if (discountParam) {
                // For multiple categories, we need to use $in operator
                const discount = discountParam.split(',');
                if (discount.length > 0) {
                    params['Discount'] = { $in: discount };
                }
            }
            // Add subcategory if it exists
            if (queryParams.get('subcategory')) {
                params['Sub_Category'] = queryParams.get('subcategory');
            }
            // if (queryParams.get('discount')) {
            //     params['Discount'] = queryParams.get('discount');
            // }
            // Add sort parameter if it exists
            if (Sort) {
                params['Sale_Price'] = Sort;
            }
            const res = await getallproducts(params);
            setProducts(res.resdata);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, [selectedCategories, selectedDiscount, queryParams, selectedSubcategory, Sort]);
    const allCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getallproducts();
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

    const getWishlistItem = useCallback(async () => {
        var res = await getWishlistItems(userdetails?.Email);
        setWishlistData(res.response)
    }, [selectedCategory, selectedSubcategory, Sort]);
    useEffect(() => {
        if (isMounted) {
            getAllProducts();
            getWishlistItem();
        }
        return () => { isMounted = false; };
    }, [selectedCategory, selectedSubcategory, Sort]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam == 'Fresh Flowers & Leaves') {
            setVisible(true);
        }
        if (categoryParam) {
            setSelectedCategory(decodeURIComponent(categoryParam));
        }
        else {
            setSelectedCategory("");
        }
    }, [location.search, categories]);

    const getAllCategories = useCallback(async () => {
        try {
            const res = await getallcategory();
            setCategories(res?.resdata || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
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
            const existingCartItem = cartItemsFromStore.find(item => item._id === prod._id);
            const isFreshProduce = prod.Category === "Fresh Produce";
            const increment = isFreshProduce ? 0.5 : 1;

            if (existingCartItem) {
                const updatedQuantity = existingCartItem.Quantity + increment;

                if (userdetails?.Email) {
                    await updatecartItem(existingCartItem._id, prod._id, updatedQuantity, userdetails.Email);
                }
                increaseQuantity(prod._id);

                const quantityDisplay = isFreshProduce
                    ? `${updatedQuantity.toFixed(1)} lb`
                    : updatedQuantity;
                toast.success(`Quantity increased! ${prod.Product_Name}: ${quantityDisplay}`);
            } else {
                const initialQuantity = isFreshProduce ? 0.5 : 1;
                if (userdetails?.Email) {
                    const cartData = {
                        productId: prod._id,
                        Email: userdetails.Email,
                        Quantity: initialQuantity
                    };
                    await savecartitems(cartData);
                }
                addToCart({ ...prod, Quantity: initialQuantity });
                const quantityDisplay = isFreshProduce ? "0.5 lb" : "1";
                toast.success(`Product added to cart! ${prod.Product_Name} (${quantityDisplay})`);
                updateTotalCartItems();
            }
        } catch (error) {
            toast.error("Failed to add product to cart.");
            console.error("Error adding product to cart:", error);
        }
    };
    const handleAddToWishlist = async (prod) => {
        if (userdetails?.Email) {

            if (wishlistData?.some(item => item.productId?._id === prod._id)) {
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
            setVisible1(true);
            toast.error('Please log in to save items!', { position: 'bottom-center', icon: '📢' });
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // const [selectedCategories, setSelectedCategories] = useState([]);
    // Function to toggle checkbox state
    const handleCategoryClick = (categoryName, e) => {
        e.preventDefault(); // Prevent <Link> from navigating immediately
        setSelectedCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((name) => name !== categoryName) // Uncheck
                : [...prev, categoryName] // Check
        );
    };

    return (
        <>
            <section className='max-w-full mx-auto'>
                <div className='max-w-[1900px] mx-auto flex  min-h-screen relative dark:bg-black'>
                    {/* <Headpanel selectedCategory={selectedCategory} categories={categories} /> */}
                    <div className={`lg:sticky lg:top-[101px] h-screen bg-gray-100  top-0 lg:left-0 fixed lg:overflow-y-visible   overflow-y-auto lg:z-40 z-50  duration-300  ${isSidebaropen ? " " : "-left-[100%] "} `}>
                        <div className='lg:hidden block p-2'>
                            <div className='flex justify-end'>
                                <i className="fi fi-rs-circle-xmark cursor-pointer" onClick={() => setIssidebaropen(false)}></i>
                            </div>
                        </div>
                        <div className=' border-b p-4 flex justify-between items-center'>
                            <div className=' text-sm text-black '>
                                FILTERS
                            </div>
                            <div className=' text-sm cursor-pointer text-blue-400  bg-gray-300 p-2   '>
                                CLEAR ALL
                            </div>
                        </div>
                        <div className='space-y-2 p-4 border-b'>
                            <div className=' text-sm text-gray-600 '>
                                CATEGORIES
                            </div>
                            <div className={` max-h-[50vh] w-64 cursor-default overflow-auto`}>
                                <ul className=" text-xs " >
                                    {categories.map((category) => {
                                        if (category.Category_Name === "Everything") return null;
                                        // Handle "All Categories" case
                                        const isAllCategories = category.Category_Name === "All Categories";
                                        const isChecked = isAllCategories
                                            ? !searchParams.get("category")
                                            : selectedCategories.includes(category.Category_Name);
                                        // Generate new URL with selected categories
                                        let updatedCategories = [...selectedCategories];
                                        if (isAllCategories) {
                                            updatedCategories = []; // Reset filter
                                        } else if (selectedCategories.includes(category.Category_Name)) {
                                            updatedCategories = updatedCategories.filter(cat => cat !== category.Category_Name);
                                        } else {
                                            updatedCategories.push(category.Category_Name);
                                        }
                                        const queryString = updatedCategories.length > 0 ? `?category=${updatedCategories.join(",")}` : "";
                                        const linkTo = `/products${queryString}`;
                                        return (
                                            <li key={category._id} className="group py-1">
                                                <Link to={linkTo}  >
                                                    <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                                                        {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                                                        <input type="checkbox" className='cursor-pointer' checked={isChecked} readOnly />
                                                        <h5 className="whitespace-pre-wrap text-gray-500">{category.Category_Name}</h5>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='space-y-2 p-4 border-b'>
                            <h1 className="text-sm text-gray-600 uppercase">Price</h1>
                            <div className="flex justify-content-center">
                                <div className="card">
                                    <InputText value={value} onChange={(e) => setValue(e.target.value)} className="w-full text-center rounded-none py-2 focus:ring-0" />
                                    <Slider value={value} onChange={(e) => setValue(e.value)} className="w-full " />
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2 p-4 border-b'>
                            <h1 className="  text-sm text-gray-600 uppercase ">Discount</h1>
                            {/* <div className='text-xs space-y-2'>
                                <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden ">
                                    <input type="checkbox" className='text-white  border-none  ' readOnly />
                                    <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">30 % or more</h5>
                                </div>
                                <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                                    <input type="checkbox" className='text-white  border-none  ' readOnly />
                                    <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">40 % or more</h5>
                                </div>
                                <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                                    <input type="checkbox" className='text-white  border-none  ' readOnly />
                                    <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">50 % or more</h5>
                                </div>
                                <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                                    <input type="checkbox" className='text-white  border-none  ' readOnly />
                                    <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">60 % or more</h5>
                                </div>
                            </div> */}
                            {/* {discount.map((discounts, index) => {
                                return (
                                    <div key={index} className="group py-1">
                                        <div className="flex gap-2 justify-start items-center  overflow-hidden">
                                            <input type="checkbox" className='cursor-pointer' readOnly />
                                            <h5 className="whitespace-pre-wrap text-gray-500">{discounts.Discount}</h5>
                                        </div>

                                    </div>
                                );
                            })} */}

                        </div>
                        {/* <div className='space-y-2 p-4 border-b'>
                            <h1 className="  text-sm text-gray-600 uppercase ">Customer Ratings</h1>
                            <div className='text-xs py-1'>
                                <div className="flex gap-2 justify-start items-center  overflow-hidden ">
                                    <input type="checkbox" className='text-white  border-none  ' readOnly />
                                    <h1 className="whitespace-pre-wrap text-gray-500 flex items-center">3 <span><i className="fi fi-ss-star flex items-center"></i></span> & above</h1>
                                </div>
                                <div className="flex gap-2 justify-start items-center  overflow-hidden">
                                    <input type="checkbox" className='text-white  border-none  ' readOnly />
                                    <h1 className="whitespace-pre-wrap text-gray-500 flex items-center">4 <span> <i className="fi fi-ss-star flex items-center"></i> </span> & above</h1>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div>
                        <div>
                            <div className='grid grid-cols-12 gap-1'>
                                <div className="relative col-span-12 ">
                                    <Items isLoading={isLoading} products={products} placements={placements} setIssidebaropen={setIssidebaropen} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist}
                                        setSort={setSort} wishlistData={wishlistData} scrolled={scrolled} />  </div>
                                {/* <div className="col-span-2">
                            <FilterSidebar className="col-span-2" togfilter={togfilter} settog={settog} tog={tog} settog2={settog2} tog2={tog2} settog3={settog3} tog3={tog3}
                                Tags={Tags} handleTagsCheckboxChange={handleTagsCheckboxChange} />
                            <div onClick={() => settogfilter(false)} className={`${togfilter ? 'translate-x-0' : '-translate-x-full'} lg:hidden h-screen w-full fixed top-0 left-0 z-20 bg-black/50`}> </div>
                        </div> */}
                            </div>
                        </div>
                        <PopupModal visible={visible} setVisible={setVisible} />
                        <RegisterContinueGoogle visible={visible1} setVisible={setVisible1} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products