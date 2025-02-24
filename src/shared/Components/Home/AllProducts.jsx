import { useEffect, useState, useCallback, useRef } from "react";
import SwiperMin from "./SwiperMin";
import { getallproducts } from "../../services/apiproducts/apiproduct";
import { products1 } from '../../services/json/heroSection.js'
import { Link } from "react-router-dom";
import apiurl from "../../services/apiendpoint/apiendpoint.js";
import Marquee from "react-fast-marquee";

function AllProducts({ groupedProducts, categoryProducts }) {
  const [productLimit, setProductLimit] = useState(6); // Default to 6
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width >= 1280 && width < 1680) {
        setProductLimit(5); // Show 5 products for 1280px to 1660px
      } else {
        setProductLimit(6); // Default to 6 for other screen sizes
      }
    };
    updateLimit(); // Set initial value
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);
  return (
    <>
      <div className=" ">
        <div className="relative md:my-10 my-5">
          {Object.keys(groupedProducts || {}).map((category, index) => (
            <div key={index} className="md:mb-10 mb-5 ">
              <div className="flex justify-between items-center my-2 px-3">
                <div className="flex gap-2 items-center">
                  <img className="md:w-10 w-8" src="/images/Design/Magizh-design.png" alt="" />
                  <h2 className="md:text-2xl text-sm font-bold text-secondary underline underline-offset-4">{category}</h2>
                </div>
                <Link to={`products?category=${category}`} className="h-fit sm:h-full p-2 lg:px-4 rounded-full border group bg-primary text-white flex gap-2 justify-center items-center">
                  <button className="text-xs lg:text-base flex gap-2 items-center">
                    View All <i className="fi fi-sr-angle-circle-right flex items-center group-hover:translate-x-1 duration-300"></i>
                  </button>
                </Link>
              </div>
              <div className="relative pl-3 md:px-3 lg:bg-gray-50 lg:p-3 rounded-md">
                {isLargeScreen ? (
                  <Marquee style={{ scroll }} speed={50} pauseOnHover={true}>
                    <div className="flex gap-5  px-2 overflow-x-auto scrollbar-hide ">
                      {groupedProducts[category].map((product, idx) => (
                        <Link key={idx} to={`/product-details/${product._id}`}>
                          <div className="flex flex-col group relative duration-300 md:p-3 p-2 space-y-3 from-[#70c2a9] via-primary to-primary hover:to-[#8ad1bc] shadow-sm hover:via-primary hover:from-primary rounded-xl border border-primary hover:bg-gray-100 w-72">
                            <div className="h-40 lg:h-60 overflow-hidden rounded-xl flex items-center justify-center bg-white">
                              <img src={`${apiurl()}/${product?.Images[0]}`} alt={product.Product_Name || 'Product'} className="object-cover h-full w-full bg-white duration-300" />
                            </div>
                            <div className="space-y-1">
                              <p className="line-clamp-2 text-gray-500 lg:text-base text-sm group-hover:text-gray-700">{product.Product_Name || 'No Name Available'}</p>
                              <div className="flex gap-3 items-center justify-between">
                                <div className="flex gap-3 items-center">
                                  {product.Discount > 0 && (
                                    <>
                                      <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg">
                                        ₹{parseFloat(product?.Sale_Price)}
                                      </h3>
                                      <h3 className="text-sm line-through text-third dark:text-white">
                                        ₹{parseFloat(product?.Regular_Price)}
                                      </h3>
                                    </>
                                  )}
                                  {product?.Discount === 0 && product?.Sale_Price > 0 && (
                                    <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg">
                                      ₹{parseFloat(product?.Sale_Price)}
                                    </h3>
                                  )}
                                </div>
                                <i className="fi fi-sr-eye flex items-center justify-end md:text-3xl text-xl text-primary"></i>
                              </div>
                            </div>
                            <div className="absolute z-10 top-0 left-2 md:top-5 lg:left-5 lg:text-xs text-[10px]">
                              {(product.QTY === 0 || product.Stock === 'Out of Stock') && (
                                <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                                  <p>Out of Stock</p>
                                </div>
                              )}
                              {(product.QTY <= 5 && product.QTY > 0 && product.Stock === 'Stock') && (
                                <div className="bg-[#f1aa59] p-1 text-white rounded-full px-1.5 mb-2">
                                  <p>Limited Stock</p>
                                </div>
                              )}
                              {(product.QTY > 0 && product.Discount > 0 && product.Stock === 'Stock') && (
                                <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                                  <p>{Math.round(product?.Discount)}% off</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Marquee>
                ) : (
                  <>
                    <div className="flex gap-3  px-2 overflow-x-auto scrollbar-hide">
                      {groupedProducts[category].map((product, idx) => (
                        <Link key={idx} to={`/product-details/${product._id}`}>
                          <div className="flex flex-col group relative duration-300 md:p-3 p-2 space-y-3 from-[#70c2a9] via-primary to-primary hover:to-[#8ad1bc] shadow-sm hover:via-primary hover:from-primary rounded-xl border border-primary hover:bg-gray-100 lg:w-72 md:w-60 w-52">
                            <div className="h-40 lg:h-60 overflow-hidden rounded-xl flex items-center justify-center bg-white">
                              <img src={`${apiurl()}/${product?.Images[0]}`} alt={product.Product_Name || 'Product'} className="object-cover h-full w-full bg-white duration-300" />
                            </div>
                            <div className="space-y-1">
                              <p className="line-clamp-2 text-gray-500 lg:text-base text-sm group-hover:text-gray-700">{product.Product_Name || 'No Name Available'}</p>
                              <div className="flex gap-3 items-center justify-between">
                                <div className="flex gap-3 items-center">
                                  {product.Discount > 0 && (
                                    <>
                                      <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg">
                                        ₹{parseFloat(product?.Sale_Price)}
                                      </h3>
                                      <h3 className="text-sm line-through text-third dark:text-white">
                                        ₹{parseFloat(product?.Regular_Price)}
                                      </h3>
                                    </>
                                  )}
                                  {product?.Discount === 0 && product?.Sale_Price > 0 && (
                                    <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg">
                                      ₹{parseFloat(product?.Sale_Price)}
                                    </h3>
                                  )}
                                </div>
                                <i className="fi fi-sr-eye flex items-center justify-end md:text-3xl text-xl text-primary"></i>
                              </div>
                            </div>
                            <div className="absolute z-10 top-0 left-2 md:top-5 lg:left-5 lg:text-xs text-[10px]">
                              {(product.QTY === 0 || product.Stock === 'Out of Stock') && (
                                <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                                  <p>Out of Stock</p>
                                </div>
                              )}
                              {(product.QTY <= 5 && product.QTY > 0 && product.Stock === 'Stock') && (
                                <div className="bg-[#f1aa59] p-1 text-white rounded-full px-1.5 mb-2">
                                  <p>Limited Stock</p>
                                </div>
                              )}
                              {(product.QTY > 0 && product.Discount > 0 && product.Stock === 'Stock') && (
                                <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                                  <p>{Math.round(product?.Discount)}% off</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <>
      </>

      {/*
      <div className="marquee">
        <p>This is a smooth scrolling marquee effect using CSS animations.</p>
      </div> */}
    </>
  );
}

export default AllProducts;