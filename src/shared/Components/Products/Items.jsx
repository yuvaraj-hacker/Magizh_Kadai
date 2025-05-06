import { Select, SelectItem } from "@nextui-org/react";
import { Link, useLocation } from 'react-router-dom';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { useEffect, useState } from "react";


const Items = (prpos) => {
  const { products, placements, handleAddToCart, handleAddToWishlist, setSort, wishlistData, scrolled, queryParams, setIssidebaropen, cartItems, removeItem, decreaseQuantity, } = prpos;

  const location = useLocation();
  const [sortDirection, setSortDirection] = useState('desc');
  const [lastAdded, setLastAdded] = useState(null);
  const [clickedProductId, setClickedProductId] = useState(null);
  const [glowEffect, setGlowEffect] = useState(false);


  // Run effect only when the component mounts or when coming back from product details
  useEffect(() => {
    const storedProductId = sessionStorage.getItem("clickedProductId");
    if (storedProductId) {
      setClickedProductId(storedProductId);
      setGlowEffect(true); // Enable glow effect

      // Remove glow effect after 2 seconds
      const glowTimeout = setTimeout(() => {
        setGlowEffect(false);
      }, 2000);

      // Cleanup timeout when component unmounts
      return () => clearTimeout(glowTimeout);
    }
  }, []); // Run only on mount

  useEffect(() => {
    // Function to clear highlight on any user interaction
    const removeHighlight = () => {
      sessionStorage.removeItem("clickedProductId");
      setClickedProductId(null);
    };

    document.addEventListener("click", removeHighlight);
    document.addEventListener("keydown", removeHighlight); // Clear on keyboard actions

    return () => {
      document.removeEventListener("click", removeHighlight);
      document.removeEventListener("keydown", removeHighlight);
    };
  }, []);



  // Extract pathname and search parameters


  // Show filter only if the path is "/products" without query params
  // if (!products || products.length === 0) {
  //   return (
  //     <section className="h-screen flex items-center flex-col md:w-[95vw] w-[100vw]   mx-auto justify-center px-5">
  //       <img className="w-28" src="/images/Design/nofound.png" alt="" />
  //       <h2 className="text-xl font-semibold text-black">No products found</h2>
  //     </section>
  //   );
  // }

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

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>

        <section className="2xl:px-5">
          <div className={`w-full sticky top-[149px] lg:top-[126px] xl:top-[130px] bg-white z-30 ${scrolled ? '' : ''}`}>
            <div className="pt-3 md:px-6 px-2  md:hidden hidden  ">
              <div className="font-bold text-primary flex gap-2 md:text-xl text-sm">
                {queryParams.get("category") ? (
                  <>
                    {decodeURIComponent(queryParams.get("category")).split(",").join(" / ")}
                  </>
                ) : (
                  "All Products"
                )}
                {queryParams.get("subcategory") && (
                  <>
                    <div className="font-medium">
                      {" "} / {decodeURIComponent(queryParams.get("subcategory"))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-black z-40 flex items-center justify-between w-full gap-4   py-2 md:px-6 px-2">
              <div className="flex gap-3 items-center">
                <div className="    md:block hidden  ">
                  <div className="font-bold text-primary flex gap-2 md:text-xl text-sm">
                    {queryParams.get("category") ? (
                      (() => {
                        const categories = decodeURIComponent(queryParams.get("category")).split(",");
                        // Show only if one category is selected
                        if (categories.length === 1) {
                          return (
                            <Link to={`/products?category=${encodeURIComponent(queryParams.get("category"))}`} className="text-primary font-bold hover:underline" >
                              {categories[0]}
                            </Link>
                          );
                        } else {
                          return null; // Hide if two or more categories are selected
                        }
                      })()
                    ) : (
                      <p className="text-primary md:text-xl text-base">All Products</p>
                    )}

                    {queryParams.get("subcategory") && (
                      <div className="font-medium"> / {decodeURIComponent(queryParams.get("subcategory"))}</div>
                    )}
                  </div>
                </div>
                <div className="  dark:text-black md:text-base text-xs  font-bold dark:bg-white dark:p-2 dark:rounded-3xl">({`${products.length} results`})</div>
              </div>

              <div className=" flex  items-center md:gap-3 gap-2  ">
                <div className='inline-flex  items-center gap-2 md:block '>
                  {/* <Select labelPlacement={placements[0]} size='sm'
                  label={
                    <div className='flex items-center justify-center gap-3'>
                      <i className="fi fi-br-bars-sort md:text-base text-sm"></i>
                      <span className="dark:text-black md:text-base text-sm"> Sort By</span>
                    </div>
                  } className="w-40 max-w-xs lg:w-60" classNames={{ trigger: " dark:bg-gray-100 dark:text-black bg-gray-50", listbox: " dark:bg-gray-200 dark:text-black bg-gray-50", popover: " dark:bg-gray-200 dark:text-black bg-gray-50" }}  >
                  <SelectItem onClick={() => setSort(1)}>Price: Low to High</SelectItem>
                  <SelectItem onClick={() => setSort(-1)}>Price: High To Low</SelectItem>
                </Select> */}
                  <div className="flex gap-3 items-center bg-primary  rounded-md md:p-2 p-1">
                    <p className=" block   text-white md:text-base text-sm">Price :</p>
                    <button onClick={toggleSortDirection} className=" rounded-md   transition-colors duration-200 relative group  bg-white  p-1 text-primary"
                      aria-label={sortDirection === 'asc' ? 'Sort Low to High' : 'Sort High to Low'}  >
                      {sortDirection === 'asc' ? (
                        <svg onClick={() => setSort(-1)} className="w-5 h-5  font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                        </svg>
                      ) : (
                        <svg onClick={() => setSort(1)} className="w-5 h-5  font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                      )}
                      {/* <i className="fi fi-br-sort-alt"></i> */}
                      <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded  whitespace-nowrap p-2 md:block hidden ">
                        {sortDirection === 'asc' ? 'High to Low' : 'Low to High'}
                      </span>
                    </button>
                  </div>

                </div>
                <div className="flex gap-3 items-center bg-primary  rounded-md   md:p-2 p-2">
                  <p className=" md:block hidden  text-white ">Filter :</p>
                  <div className="  block text-end   md:bg-white  rounded-md  md:p-1.5 p-0.5 cursor-pointer" onClick={() => setIssidebaropen(prev => !prev)}>
                    <div className="flex justify-end gap-4 items-center w-fit   ">
                      <i className="fi fi-rr-settings-sliders flex items-center font-bold   md:text-base text-sm md:text-primary text-white"></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <div className="relative p-2     grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 overflow-y-auto lg:mt-0  md:mt-5 mt-0 3xl:grid-cols-7  2xl:grid-cols-6  xl:grid-cols-5 gap-x-3 md:px-5 h-[100%] ">
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
                <Link to={`/product-details/${prod._id}`} state={{ product: prod }} onClick={() => { sessionStorage.setItem("scrollPosition", window.scrollY); sessionStorage.setItem("clickedProductId", prod._id); }}>
                  <div key={i} className="relative group ">
                    <div className={`w-full     bg-white flex justify-between flex-col relative mb-5 shadow-md border  rounded-md hover:shadow-md duration-300  md:h-[370px]   h-[250px]  ${lastAdded === prod._id ? ' border-primary' : ' '}  ${clickedProductId === prod._id && location.pathname !== `/product-details/${prod._id}` ? "border-primary border-2 " : " "}  ${clickedProductId === prod._id && glowEffect ? "animate-scaleIn" : ""}`}>
                      {/* wishlist & cart */}
                      {prod.Category === "New Arrivals" && (
                        <>
                          <div className="absolute -top-2 -left-2 z-10">
                            <img className="md:w-24 w-16" src="/images/Design/newfaf.gif" alt="" />
                          </div>
                        </>
                      )}

                      <div className="absolute top-2 right-2 lg:absolute z-20 mb-1 flex justify-end lg:justify-center items-center md:gap-2 font-semibold  ">
                        {prod.QTY > 0 && prod.QTY !== null && prod.Stock === 'Stock' && prod.Category !== "Upcoming Arrivals" && (
                          <>
                            {cartItems.some(item => item._id === prod._id) ? (
                              // Show Increment & Decrement (or Delete) Controls
                              <div onClick={(e) => { e.preventDefault() }} className={`  items-center gap-2 bg-gray-100  md:w-[92px] w-[77px] grid grid-cols-3 rounded-full  border-2 ${lastAdded === prod._id ? ' border-primary' : 'border-secondary border-2'}   `}>
                                {cartItems.find(item => item._id === prod._id)?.Quantity === 1 ? (
                                  // Show Delete Icon if Quantity is 1
                                  <button
                                    onClick={(e) => { e.preventDefault(); removeItem(prod._id); setLastAdded(prod._id); }}
                                    className="text-red-500 hover:text-red-700  flex items-center    p-1 px-1"
                                  >
                                    <i className="fi fi-rr-trash flex items-center text-sm "></i>
                                  </button>
                                ) : (
                                  // Show Minus Button if Quantity > 1
                                  <button onClick={(e) => { e.preventDefault(); decreaseQuantity(prod._id); setLastAdded(prod._id); }}
                                    className="text-primary text-lg    p-1 px-1 flex items-center"   >
                                    {/* - */}
                                    <i className="fi fi-rr-minus-small flex items-center"></i>
                                  </button>
                                )}
                                <span className="text-primary text-sm font-bold  mx-auto   ">
                                  {cartItems.find(item => item._id === prod._id)?.Quantity}
                                </span>
                                {cartItems.find(item => item._id === prod._id)?.Quantity < prod.QTY && (
                                  <button onClick={(e) => { e.preventDefault(); handleAddToCart(prod); setLastAdded(prod._id); }} className="  text-lg  p-1  flex items-center    text-primary">
                                    <>
                                      {/* + */}
                                      <i className="fi fi-rr-plus-small flex items-center"></i>
                                    </>
                                  </button>
                                )}
                              </div>
                            ) : (
                              // Show Add to Cart Button if Product is NOT in Cart
                              <button onClick={(e) => { e.preventDefault(); handleAddToCart(prod); setLastAdded(prod._id); }} className="flex justify-center items-center   rounded-full     " >
                                <i className="fi fi-rr-shopping-cart-add text-base lg:text-xl  p-2 rounded-full flex items-center  bg-gray-200  text-primary duration-300"></i>
                              </button>
                            )}
                          </>
                        )}
                        {/* <button onClick={(e) => { e.preventDefault(); handleAddToWishlist(prod); }} className="  group">
                      <div className="relative flex items-center justify-center w-10 h-10">
                        {wishlistData?.map(resp => resp.productId?._id).includes(prod._id) ? (
                          <div className="absolute inset-0 duration-300 bg-red-100 rounded-full opacity-50 animate-ping"></div>
                        ) : null}
                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out border
                                ${wishlistData?.map(resp => resp.productId?._id).includes(prod._id)
                            ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-300/50 '
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
                      <div className="absolute z-10 top-3 left-2 lg:top-2 lg:left-2 text-[10px] lg:text-xs ">
                        {(prod.QTY === 0 || prod.Stock === 'Out of Stock') && (
                          <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                            <p className="">Out of Stock</p>
                          </div>
                        )}
                        {/* {prod.Discount > 0 && (
                    <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                      <p className=""> {Math.round(prod?.Discount)}% off</p>
                    </div>
                  )} */}
                        {(prod.QTY > 0 && prod.Discount > 0 && prod.Stock === 'Stock') && (
                          <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                            <p className="">{Math.round(prod?.Discount)}% off</p>
                          </div>
                        )}
                      </div>
                      <div className="relative flex items-center justify-center    overflow-hidden rounded-lg   p-1">
                        <img key={`${i}`} src={`${apiurl()}/${prod?.Images}`.split(',')[0]} alt={`Product ${i + 1}`} className={`  object-contain  pt-1 group-hover:opacity-80 duration-300 w-full max-h-52 md:h-52 h-32 rounded-lg`} />
                      </div>
                      <div className=" md:px-3 md:pb-3  p-1 space-y-1">
                        <h2 className=" text-sm text-black dark:text-white md:text-base line-clamp-2 text-left">
                          {prod.Product_Name}
                        </h2>
                        {/* {prod.QTY <= 5 && prod.QTY > 0 && (
                    <div className="bg-[#f1aa59] p-1 w-fit text-xs text-white rounded-full px-1.5 mb-2">
                      <p className="">Limited Stock</p>
                    </div>
                  )} */}
                        <div className=" lg:flex items-center justify-between space-y-1 flex-wrap  ">
                          <div className="order-1 lg:order-2">
                            {(prod.QTY <= 5 && prod.QTY > 0 && prod.Stock === 'Stock') && (
                              <div className="bg-[#f1aa59] p-1 text-white md:text-[9px] text-[7px]  rounded-full w-fit  ">
                                <p className="">Limited Stock</p>
                              </div>
                            )}
                            {(prod.Category == "Upcoming Arrivals") && (
                              <div className="bg-indigo-500 p-1 text-white md:text-[9px] text-[7px]  rounded-full w-fit  ">
                                <p className="">Upcoming Arrivals</p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center md:gap-3 gap-2 order-2 lg:order-1">
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
                              <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg  shadow-white drop-shadow-md">
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

    </>
  );
};

export default Items;
// <div key={i} className="relative px-2 pt-8 pl-6 duration-300 md:pt-10 md:pl-10 group">
//   <img
//     className="absolute w-16 -z-10 -top-0 -left-0 md:w-20 group-hover:animate-wiggle dark:z-auto"
//     src="/images/Design/rangoli 16.png"
//     alt=""
//   />
//   <div className="w-full bg-cover  min-h-[160px]  max-h-[160px]  p-4  bg-white flex justify-center items-center shadow-md border rounded-lg relative cursor-pointer">

//   <button onClick={() => handleAddToWishlist(prod)} className="absolute top-2 left-3 group">
//     <div className="relative flex items-center justify-center w-10 h-10">
//       {wishlistData?.map(resp => resp.productId?._id).includes(prod._id) ? (
//         <div className="absolute inset-0 duration-300 bg-red-100 rounded-full opacity-50 animate-ping"></div>
//       ) : null}

//       <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out
//         ${wishlistData?.map(resp => resp.productId?._id).includes(prod._id)
//           ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-300/50 scale-80'
//           : 'bg-gray-100 hover:bg-white shadow-xl shadow-black/20'}
//       `}>
//         {wishlistData?.map(resp => resp.productId?._id).includes(prod._id) ? (
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current animate-heart-pop">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//           </svg>
//         ) : (
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500 transition-colors stroke-current stroke-2 fill-none hover:text-gray-700"
//           >
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//           </svg>
//         )}
//       </div>
//     </div>
//   </button>
//     <div className="absolute z-10 top-2 right-3">
//       {prod.Discount > 0 && (
//         <div className="bg-[#24aa3b] p-1 text-white rounded-lg text-center">
//           <p className="text-xs "> {prod?.Discount}% off</p>
//         </div>
//       )}
//     </div>
//     <div className="absolute z-10 bottom-[-3%] left-2">
//     {(prod.QTY <= 0) && (
//       <div className="bg-[#E42D12] p-1 text-white rounded-lg mb-2">
//         <p className="text-xs">Out of Stock</p>
//       </div>
//     )}
//       {prod.QTY <= 5 &&prod.QTY > 0 && (
//         <div className="bg-[#f1aa59] p-1 text-white rounded-lg mb-2">
//           <p className="text-xs ">Limited Stock</p>
//         </div>
//        )}
//     </div>
//     {/* Product Link */}
//     <Link to={`/product-details/${prod._id}`} state={{ product: prod }}>
//       <img
//         src={`${apiurl()}/${prod.Images[0]}`}
//         alt={prod.Product_Name}
//         className="min-h-[140px]  max-h-[140px] object-contain"
//            loading="lazy"
//       />
//     </Link>
//     {/* Add to Cart Button */}
//     {prod.QTY > 0 && prod.QTY !== null && (
//     <div onClick={() => handleAddToCart(prod)} className="absolute bottom-3 right-3  flex justify-center items-center border-[1.5px] rounded-full border-[#259c51] bg-white overflow-hidden shadow-md hover:bg-gray-100 duration-300" >
//       <img className="w-8 p-2 duration-500 md:w-full" src="/images/Design/Plus Math.png" alt="" />
//     </div>
//     )}
//   </div>
//   {/* Product Details */}
//   <div className="mt-6">
//     <h2 className="mt-3 text-sm text-black md:text-base line-clamp-2 dark:text-white">{prod.Product_Name}</h2>
//     <div className="flex items-center gap-3">
//       {/* Discounted Price */}
//       {prod.Discount > 0 && (
//         <>
//           <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
//             ${((prod?.Sale_Price - (prod?.Sale_Price * prod?.Discount) / 100)).toFixed(2)}
//           </h3>
//           {/* Original Price */}
//           <span className="text-sm text-gray-400 line-through dark:text-white">
//             ${prod.Sale_Price.toFixed(2)}
//           </span>
//         </>
//       )}
//       {prod?.Discount === 0 && prod?.Sale_Price > 0 && (
//         <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
//           ${prod?.Sale_Price?.toFixed(2)}
//         </h3>
//       )}

//     </div>
//   </div>
// </div>

