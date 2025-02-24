import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Home/Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import toast from "react-hot-toast";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { Link } from "react-router-dom";
import useAuth from "../../services/store/useAuth";
import useCart from "../../services/store/useCart";
import { savecartitems, updatecartItem } from "../../services/cart/cart";
import { getWishlistItems, RemoveWishlistItem, savewishitems } from "../../services/wishlist/wishlist"; // deleteWishlistItem
import RegisterContinueGoogle from "../Register-ContiGoogle/RegisterContiGoogle";
import { getallNewCollection } from "../../services/apiproducts/apiproduct";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Title Section */}
      <div className="flex items-center justify-between pt-3 lg:py-5">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full md:w-20 md:h-20"></div>
          <div className="relative flex items-center h-8 bg-gray-200 rounded-full right-8 md:h-10">
            <div className="w-24 h-4 ml-8 bg-gray-300 rounded md:w-32 md:h-5"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="relative px-4 pt-8 pl-6 md:pt-10 md:pl-10">
            <div className="absolute w-16 h-16 bg-gray-100 rounded-full -z-10 -top-0 -left-0"></div>
            <div className="w-full p-4 bg-white border rounded-lg shadow-md min-h-[160px] relative">
              <div className="absolute w-6 h-6 bg-gray-200 rounded-full top-2 left-3"></div>
              <div className="w-full h-24 mx-auto bg-gray-200 rounded"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-200 rounded-full translate-y-1/3 translate-x-1/3"></div>
            </div>
            <div className="pl-1">
              <div className="w-3/4 h-4 mt-3 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-px mt-2 mb-3 bg-gray-200"></div>
    </div>
  );
};


const ProductImage = ({ images, productId }) => {
  const imageArray = Array.isArray(images) ? images : [images];

  return (
    <div className="relative flex items-center justify-center p-3 overflow-hidden rounded-lg   object-contain">
      {imageArray.map((image, index) => (
        <img key={`${productId}-${index}`} src={`${apiurl()}/${image}`} alt={`Product ${index + 1}`} className={`${index === 0 ? 'block' : 'hidden'}  object-contain  h-48  group-hover:opacity-80 duration-300   rounded-lg`} />
      ))}
    </div>
  );
};

const SwiperMin = ({ Product, title }) => {
  const swiperRef = useRef(null);
  const { userdetails } = useAuth();
  // const [isActive, setIsActive] = useState(false);
  const { addToCart, cartItems, increaseQuantity, updateTotalCartItems } = useCart(); // decreaseQuantity, addToWishlist, wishlist
  const [wishlistData, setWishlistData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [collection, setCollection] = useState([]);

  let isMounted = true;


  const newCollection = useCallback(async () => {
    try {
      const res = await getallNewCollection();



      // Ensure response is valid and set trending safely
      setCollection(Array.isArray(res?.response) ? res.response : []);
    } catch (error) {
      console.error("Failed to fetch trending products:", error);
      setCollection([]); // Set empty array on error to avoid crashes
    }
  }, []);

  useEffect(() => {
    newCollection();
  }, [newCollection]);


  const getWishlistItem = useCallback(async () => {
    var res = await getWishlistItems(userdetails?.Email);
    setWishlistData(res.response)
  }, []);

  useEffect(() => {
    if (isMounted) {
      getWishlistItem();
    }
    return () => { isMounted = false; };
  }, []);

  // const handleAddToCart = async (prod) => {
  //   try {
  //     const cartItemsFromStore = cartItems || [];
  //     const existingCartItem = cartItemsFromStore.find(item => item._id === prod._id);
  //     if (existingCartItem) {
  //       const updatedQuantity = existingCartItem.Quantity + 1;

  //       if (userdetails?.Email) {
  //         await updatecartItem(existingCartItem._id, prod._id, updatedQuantity, userdetails.Email);
  //       }
  //       increaseQuantity(prod._id);
  //       toast.success(`Quantity increased! ${prod.Product_Name}: ${updatedQuantity}`);
  //     } else {

  //       if (userdetails?.Email) {
  //         const cartData = { productId: prod._id, Email: userdetails.Email, Quantity: 1 };
  //         await savecartitems(cartData);
  //       }

  //       addToCart({ ...prod, Quantity: 1 });
  //       toast.success(`Product added to cart! ${prod.Product_Name}`);
  //       updateTotalCartItems()
  //     }
  //   } catch (error) {
  //     toast.error("Failed to add product to cart.");
  //     console.error("Error adding product to cart:", error);
  //   }
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
      setVisible(true);
      toast.error('Please log in to save items!', { position: 'bottom-center', icon: '📢' });
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!Product || Product.length === 0) {
    return <LoadingSkeleton />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <article className="rounded-3xl flex flex-col overflow-hidden relative">
        <div className=" absolute w-full grid grid-cols-12 grid-rows-12 rounded-3xl overflow-hidden h-full">
          <div className="lg:col-span-8 lg:row-span-12 row-span-7 col-span-12 bg-gradient-to-br bg-primary h-full"></div>
          <div className="lg:col-span-4 lg:row-span-12 row-span-5 col-span-12 bg-primary h-full"></div>
        </div>
        <div className="relative z-10 flex justify-between items-center w-full   mx-auto py-5  px-3   2xl:px-5">
          <div className=" ">
            <div className="flex gap-2 items-center">
              {/* <img className="md:w-10 w-8 invert" src="/images/Design/Magizh-design.png" alt="" /> */}
              <p className="capitalize  text-secondary font-bold md:text-2xl underline underline-offset-4  ">New collection</p>
            </div>
            {/* <p className="capitalize tracking-widest lg:text-4xl text-xl font-semibold lg:text-primary text-primary_green ">Trending Flash Sale</p> */}
          </div>
          {/* <Link to='/products'><div className="h-fit sm:h-full   p-2 lg:px-4 rounded-full border border-w flex gap-2 justify-center items-center text-white group/vwbtn *:duration-300"><button className="capitalize md:tracking-wider inline-flex gap-1.5">View {' '} <span className="hidden md:block"> All Collection</span> </button><i className="fi fi-rs-arrow-up-right rotate-45 group-hover/vwbtn:rotate-0"></i></div></Link> */}
          {/* <div className="absolute h-[0.5px] w-full bg-slate-500/70 bottom-4"></div> */}
        </div>
        <div className="w-full mx-auto swiper-container-wrapper px-5 ">
          <div className="swiper-container"
            onMouseEnter={() => swiperRef.current?.swiper?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.swiper?.autoplay?.start()}
            // variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}>
            <Swiper
              ref={swiperRef}
              speed={5000}
              loop={true}
              slidesPerView="auto"
              autoplay={{ delay: 0, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 }, 460: { slidesPerView: 2, spaceBetween: 10 }, 768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 10 }, 1500: { slidesPerView: 6, spaceBetween: 20 },
              }} modules={[Navigation, Autoplay]}  >
              {collection.filter((prod) => prod.QTY > 0).map((prod, i) => (
                <SwiperSlide key={prod._id || i} className="">
                  <Link to={`/product-details/${prod._id}`} state={{ product: prod }}>
                    <div className="relative group   ">
                      <div className="w-full   bg-white flex justify-between flex-col rounded-2xl relative mb-5 border shadow-md hover:shadow-lg duration-300 ">
                        {/* wishlist & cart */}
                        <div className="absolute top-2 right-2 lg:absolute z-30 mb-1 flex justify-end lg:justify-center items-center md:gap-2 lg:opacity-0 lg:group-hover:opacity-100 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-full lg:group-hover:-translate-y-1/2 duration-300">
                          {prod.QTY > 0 && prod.QTY !== null && (
                            <button onClick={(e) => { e.preventDefault(); handleAddToCart(prod); }} className="flex justify-center items-center border-[1.5px] rounded-full bg-gray-100 hover:bg-white  group overflow-hidden shadow-md duration-300" >
                              <i className="fi fi-rr-shopping-cart-add text-base lg:text-2xl p-1 px-2 translate-y-1 text-gray-500 hover:text-gray-700 duration-300  "></i>
                            </button>
                          )}
                          {/* <button onClick={(e) => { e.preventDefault(); handleAddToWishlist(prod); }} className="  group">
                            <div className="relative flex items-center justify-center w-10 h-10">
                              {wishlistData?.map(resp => resp.productId?._id).includes(prod._id) ? (
                                <div className="absolute inset-0 duration-300 bg-red-100 rounded-full opacity-50 animate-ping"></div>
                              ) : null}

                              <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out border
                                ${wishlistData?.map(resp => resp.productId?._id).includes(prod._id)
                                  ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-300/50'
                                  : 'bg-gray-100 hover:bg-white shadow-xl shadow-black/10'}
                               `}>
                                {wishlistData?.map(resp => resp.productId?._id).includes(prod._id) ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current animate-heart-pop">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 transition-colors stroke-current stroke-2 fill-none hover:text-gray-700">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </button> */}
                        </div>
                        <div className="absolute z-10 top-4 left-2 md:top-5 lg:left-5 lg:text-xs text-[10px] ">
                          {prod.QTY === 0 && (
                            <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                              <p className="">Out of Stock</p>
                            </div>
                          )}
                          {prod.QTY <= 5 && prod.QTY > 0 && (
                            <div className="bg-[#f1aa59] p-1 text-white rounded-full px-1.5 mb-2">
                              <p className="">Limited Stock</p>
                            </div>
                          )}
                          {prod.QTY > 0 && prod.Discount > 0 && (
                            <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                              <p className="">  {Math.round(prod?.Discount)}% off</p>
                            </div>
                          )}
                        </div>
                        <ProductImage images={prod?.Images} productId={prod._id} />
                        <div className=" p-3">
                          <h2 className=" text-sm text-black dark:text-white md:text-base line-clamp-2 text-left">
                            {prod.Product_Name}
                          </h2>
                          <div className="flex gap-3 items-center  ">
                            {prod.Discount > 0 && (
                              <>
                                <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg">
                                  ₹{parseFloat(prod?.Sale_Price)}
                                </h3>
                                <h3 className="text-sm line-through text-third dark:text-white">
                                  ₹{parseFloat(prod?.Regular_Price)}
                                </h3>
                              </>
                            )}
                            {prod?.Discount === 0 && prod?.Sale_Price > 0 && (
                              <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg">
                                ₹{parseFloat(prod?.Sale_Price)}
                              </h3>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <RegisterContinueGoogle visible={visible} setVisible={setVisible} />
        </div>
      </article>
    </>
  );
};

export default SwiperMin;