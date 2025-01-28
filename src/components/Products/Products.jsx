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

const Products = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { userdetails } = useAuth();
    const { addToCart, cartItems, increaseQuantity, updateTotalCartItems } = useCart()
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedSubcategory = queryParams.get('subcategory');
    const placements = ["inside", "outside", "outside-left"];
    const [wishlistData,setWishlistData] = useState([]);

    const [Sort, setSort] = useState(null);

    let isMounted = true;

    const getAllProducts = useCallback(async () => {
        setIsLoading(true);
        const res = await getallproducts({ Category: queryParams.get('category'), Sub_Category: queryParams.get('subcategory'), Sale_Price: Sort });
        setProducts(res.resdata);
        setIsLoading(false);
    }, [selectedCategory,queryParams, selectedSubcategory, Sort]);

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
        if (categoryParam =='Fresh Flowers & Leaves') {
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

    return (
        <>
            <div className='max-w-[1900px] mx-auto  min-h-screen relative dark:bg-black'>
                {/* <Headpanel selectedCategory={selectedCategory} categories={categories} /> */}
                <section>
                    <div className='grid grid-cols-12 gap-1'>
                        <div className="relative col-span-12 ">
                            <Items isLoading={isLoading} products={products} placements={placements} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist}
                            setSort={setSort} wishlistData={wishlistData} scrolled={scrolled} />
                        </div>
                        {/* <div className="col-span-2">
                            <FilterSidebar className="col-span-2" togfilter={togfilter} settog={settog} tog={tog} settog2={settog2} tog2={tog2} settog3={settog3} tog3={tog3}
                                Tags={Tags} handleTagsCheckboxChange={handleTagsCheckboxChange} />
                            <div onClick={() => settogfilter(false)} className={`${togfilter ? 'translate-x-0' : '-translate-x-full'} lg:hidden h-screen w-full fixed top-0 left-0 z-20 bg-black/50`}> </div>
                        </div> */}
                    </div>
                </section>
                <PopupModal visible={visible} setVisible={setVisible}/>
                <RegisterContinueGoogle visible={visible1} setVisible={setVisible1} />
            </div>
        </>
    )
}

export default Products