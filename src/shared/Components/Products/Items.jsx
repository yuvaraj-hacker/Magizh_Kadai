import { Select, SelectItem } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import apiurl from '../../services/apiendpoint/apiendpoint';
import ReactLoading from 'react-loading';

const ProductGridSkeleton = () => {
  return (
    <>
      {/* <div className="relative grid grid-cols-2 p-2 overflow-y-auto 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="relative px-2 pt-8 pl-6 duration-300 md:pt-10 md:pl-10">
            <div className="absolute w-16 h-16 bg-gray-200 rounded-full -z-10 -top-0 -left-0 animate-pulse"></div>
            <div className="w-full bg-white p-4 min-h-[160px] shadow-md border rounded-lg relative cursor-pointer flex flex-col items-center justify-center">
              <div className="absolute w-6 h-6 bg-gray-300 rounded-full top-2 left-3 animate-pulse"></div>
              <div className="w-24 h-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 translate-y-1/2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="mt-6">
              <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="flex gap-3">
                <div className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-1/3 h-5 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="relative">
        <ReactLoading type="cubes" color="#ffff" height={'20%'} width={'20%'} />
      </div>
    </>
  );
};


const Items = (prpos) => {
  const { isLoading, products, placements, handleAddToCart, handleAddToWishlist, setSort, wishlistData, scrolled, setIssidebaropen } = prpos;

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <section className="max-w-[80rem] mx-auto px-5">
        <h2 className="text-xl font-semibold  text-black">
          No products found
        </h2>
      </section>
    );
  }
  return (
    <>
      {/* products */}
      <div className={`w-full sticky top-[65px] lg:top-[103px] z-30 ${scrolled ? '' : ''}`}>
        <div className="bg-white dark:bg-black z-40 flex items-center justify-between w-full py-2 px-5">
          <div className="  dark:text-black md:text-base text-sm  font-bold dark:bg-white dark:p-2 dark:rounded-3xl">{`${products.length} results`}</div>
          <div className=" flex  items-center gap-5  ">
            <div className="lg:hidden block text-end   bg-gray-50 rounded-lg  p-3 cursor-pointer" onClick={() => setIssidebaropen(prev => !prev)}>
              <div className="flex justify-end gap-4 items-center w-fit   ">
                <i className="fi fi-rr-settings-sliders flex items-center "></i>
                <p className="">Filter</p>
              </div>
            </div>
            <div className='inline-flex items-center gap-2 md:block'>
              <Select labelPlacement={placements[0]} size='sm'
                label={
                  <div className='flex items-center justify-center gap-3'>
                    <i className="fi fi-br-bars-sort"></i>
                    <span className="dark:text-black"> Sort By</span>
                  </div>
                } className="w-40 max-w-xs lg:w-60 " classNames={{ trigger: " dark:bg-gray-100 dark:text-black", listbox: " dark:bg-gray-200 dark:text-black", popover: " dark:bg-gray-200 dark:text-black" }}  >
                <SelectItem onClick={() => setSort(1)}>Price: Low to High</SelectItem>
                <SelectItem onClick={() => setSort(-1)}>Price: High To Low</SelectItem>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="relative p-2  grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 overflow-y-auto 2xl:grid-cols-6 xl:grid-cols-5 gap-x-3 md:px-5 ">
        {products.map((prod, i) => (
          <Link to={`/product-details/${prod._id}`} state={{ product: prod }}>
            <div key={i} className="relative group ">
              <div className="w-full  md:h-[420px]  bg-white flex justify-between flex-col relative mb-5 shadow-md border  rounded-md hover:shadow-md duration-300 ">
                {/* wishlist & cart */}
                <div className="absolute top-2 right-2 lg:absolute z-20 mb-1 flex justify-end lg:justify-center items-center md:gap-2 lg:opacity-0 lg:group-hover:opacity-100 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-full lg:group-hover:-translate-y-1/2 duration-300">
                  {prod.QTY > 0 && prod.QTY !== null && (
                    <button onClick={(e) => { e.preventDefault(); handleAddToCart(prod); }} className="flex justify-center items-center border-[1.5px] rounded-full bg-gray-100 hover:bg-white  group overflow-hidden shadow-md duration-300" >
                      <i className="fi fi-rr-shopping-cart-add text-base lg:text-2xl p-1 px-2 translate-y-1 text-gray-500 hover:text-gray-700 duration-300  "></i>
                    </button>
                  )}
                  <button onClick={(e) => { e.preventDefault(); handleAddToWishlist(prod); }} className="  group">
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
                  </button>
                </div>
                <div className="absolute z-10 top-4 left-2 lg:top-5 lg:left-5 text-[10px] lg:text-xs ">
                  {prod.QTY === 0 || prod.QTY < 0 && (
                    <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                      <p className="">Out of Stock</p>
                    </div>
                  )}
                  {prod.QTY <= 5 && prod.QTY > 0 && (
                    <div className="bg-[#f1aa59] p-1 text-white rounded-full px-1.5 mb-2">
                      <p className="">Limited Stock</p>
                    </div>
                  )}

                  {/* {prod.Discount > 0 && (
                    <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                      <p className=""> {Math.round(prod?.Discount)}% off</p>
                    </div>
                  )} */}
                  {prod.QTY > 0 && prod.Discount > 0 && (
                    <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                      <p className="">{Math.round(prod?.Discount)}% off</p>
                    </div>
                  )}
                </div>
                <div className="relative flex items-center justify-center    overflow-hidden rounded-lg md:p-3 p-1">
                  <img key={`${i}`} src={`${apiurl()}/${prod?.Images}`.split(',')[0]} alt={`Product ${i + 1}`} className={` object-contain group-hover:opacity-80 duration-300  rounded-lg`} />
                </div>
                <div className=" md:p-3  p-1 space-y-1">
                  <h2 className="mt-3 text-sm text-black dark:text-white md:text-base line-clamp-2 text-left">
                    {prod.Product_Name}
                  </h2>
                  {/* {prod.QTY <= 5 && prod.QTY > 0 && (
                    <div className="bg-[#f1aa59] p-1 w-fit text-xs text-white rounded-full px-1.5 mb-2">
                      <p className="">Limited Stock</p>
                    </div>
                  )} */}
                  <div className=" flex items-center gap-3">
                    {prod.Discount > 0 && (
                      <>  <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
                        {((prod?.Sale_Price - (prod?.Sale_Price * prod?.Discount) / 100))?.toFixed(2)}
                      </h3>
                        {/* Original Price */}
                        <h3 className="text-sm text-third line-through  dark:text-white">
                          {parseFloat(prod?.Sale_Price).toFixed(2)}
                        </h3>
                      </>
                    )}
                    {prod?.Discount === 0 && prod?.Sale_Price > 0 && (
                      <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
                        {parseFloat(prod?.Sale_Price)?.toFixed(2)}
                      </h3>
                    )}
                  </div>
                  <div className="text-start  ">
                    <button className="text-white md:p-2 p-1 w-full md:text-base text-xs bg-primary rounded-md">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
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

