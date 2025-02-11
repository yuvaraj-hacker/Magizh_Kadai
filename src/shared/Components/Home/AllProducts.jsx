import { useEffect, useState, useCallback, useRef } from "react";
import SwiperMin from "./SwiperMin";
import { getallproducts } from "../../services/apiproducts/apiproduct";
import { products1 } from '../../services/json/heroSection.js'
import { Link } from "react-router-dom";
import apiurl from "../../services/apiendpoint/apiendpoint.js";

function AllProducts({ groupedProducts }) {
  const [productLimit, setProductLimit] = useState(6); // Default to 6

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= 1280 && width < 1660) {
        setProductLimit(5); // Show 5 products for 1280px to 1660px
      } else {
        setProductLimit(6); // Default to 6 for other screen sizes
      }
    };

    updateLimit(); // Set initial value
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // const [products, setProducts] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  // const groupProductsByTags = useCallback((products) => {
  //   return products.reduce((acc, product) => {
  //     const tags = product.Tags ? product.Tags.split(',').map(tag => tag.trim()) : [];
  //     tags.forEach((tag) => {
  //       if (!acc[tag]) {
  //         acc[tag] = [];
  //       }
  //       acc[tag].push(product);
  //     });
  //     return acc;
  //   }, {});
  // }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setIsLoading(true);
  //     try {
  //       const { resdata } = await getallproducts();
  //       setProducts(resdata);
  //       // setProducts(groupProductsByTags(resdata));
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchProducts();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-40">
  //       <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative md:my-10 my-5">
      {/* {Object.entries(products).map(([tag, tagProducts]) => (
        <section key={tag} className="mx-auto ">
          <SwiperMin product={tagProducts} title={tag} />
        </section>
      ))} */}

      {Object.keys(groupedProducts || {}).map((category, index) => (
        <div key={index} className="md:mb-10 mb-5">
          <div className="flex justify-between items-center my-2 px-3">
            <div className="flex gap-2 items-center">
              <img className="md:w-10 w-8" src="/images/Design/Magizh-design.png" alt="" />
              <h2 className=" md:text-2xl text-sm  font-bold text-secondary">{category}</h2>
            </div>
            <Link to={`products?category=${category}`} className="h-fit sm:h-full   p-2 lg:px-4 rounded-full border group bg-primary text-white flex gap-2 justify-center items-center  group/vwbtn *:duration-300"><button className="text-xs lg:text-base flex gap-2 items-center">View All <i className="fi fi-sr-angle-circle-right flex items-center group-hover:translate-x-1 duration-300 "></i></button></Link>
          </div>
          <div className="relative pl-3 md:px-3 ">
            <div  className="lg:grid grid-cols-2 md:grid-cols-3 3xl:grid-cols-6 xl:grid-cols-5  gap-2 flex  overflow-hidden overflow-x-auto scrollbar-hide ">
              {/* {groupedProducts[category].slice(0, 6).map((product, idx) => (
              <div key={idx} className="flex flex-col group duration-300 p-2 lg:p-3 bg-gradient-to-tr from-[#70c2a9] via-primary to-primary hover:to-[#8ad1bc] hover:via-primary hover:from-primary rounded-2xl">
              <div className="border h-40 md:h-60 overflow-hidden rounded-xl flex items-center justify-center bg-white">
               <img src={`${apiurl()}/${product?.Images[0]}`} alt={product.Product_Name || 'Product'}  className="object-cover h-full group-hover:scale-105 bg-white duration-300" />
              </div>
               <div className="*:my-2">
                <p className="line-clamp-2 text-gray-200 lg:text-base text-sm group-hover:text-gray-100">{product.Product_Name || 'No Name Available'}</p>
                <Link to={`/product-details/${product._id}`} className=" "><button className="border border-primary group-hover:border-white  p-2 px-4 rounded-xl hover:bg-primary group-hover:text-white duration-300 hover:translate-x-2">View</button></Link>

               </div>
               </div>
                    ))} */}
              {groupedProducts[category].slice(0, productLimit).map((product, idx) => (
                <Link to={`/product-details/${product._id}`}>
                  <div key={idx} className="flex flex-col group relative duration-300 md:p-3 p-2 space-y-3 from-[#70c2a9] via-primary to-primary hover:to-[#8ad1bc] shadow-sm hover:via-primary hover:from-primary rounded-xl border hover:border-primary hover:bg-gray-100">
                    <div className=" h-40 md:h-60  md:w-auto w-44 overflow-hidden rounded-xl flex items-center justify-center bg-white">
                      <img src={`${apiurl()}/${product?.Images[0]}`} alt={product.Product_Name || 'Product'} className="object-cover h-full w-full  bg-white duration-300" />
                    </div>
                    <div className="space-y-1 ">
                      <p className="line-clamp-2 text-gray-500 lg:text-base text-sm group-hover:text-gray-700">{product.Product_Name || 'No Name Available'}</p>
                      <div className="flex gap-3 items-center justify-between  ">
                        <div className="flex gap-3 items-center">
                          {product.Discount > 0 && (
                            <>
                              <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
                                ₹{((product?.Sale_Price - (product?.Sale_Price * product?.Discount) / 100))?.toFixed(2)}
                              </h3>
                              {/* Original Price */}
                              <h3 className="text-sm line-through text-third dark:text-white">
                                ₹{parseFloat(product?.Sale_Price).toFixed(2)}
                              </h3>
                            </>
                          )}
                          {product?.Discount === 0 && product?.Sale_Price > 0 && (
                            <h3 className="text-sm font-semibold text-black dark:text-white md:text-lg shadow-white drop-shadow-md">
                              ₹{parseFloat(product?.Sale_Price)?.toFixed(2)}
                            </h3>
                          )}
                        </div>
                        <div className="text-end ">
                          <i className="fi fi-sr-angle-circle-right flex items-center justify-end md:text-3xl text-xl text-primary"></i>
                        </div>
                      </div>
                    </div>
                    <div className="absolute z-10 top-0 left-2 md:top-5 lg:left-5 lg:text-xs text-[10px] ">
                      {product.QTY === 0 && (
                        <div className="bg-[#E42D12] p-1 text-white rounded-full px-1.5 mb-2">
                          <p className="">Out of Stock</p>
                        </div>
                      )}
                      {product.QTY <= 5 && product.QTY > 0 && (
                        <div className="bg-[#f1aa59] p-1 text-white rounded-full px-1.5 mb-2">
                          <p className="">Limited Stock</p>
                        </div>
                      )}
                      {product.QTY > 0 && product.Discount > 0 && (
                        <div className="bg-primary p-1 text-white rounded-full px-1.5 text-center">
                          <p className="">  {Math.round(product?.Discount)}% off</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* <div onClick={scrollRight} className=" p-3 absolute w-fit right-0 top-1/2 bg-gray-300 cursor-pointer">
              <iclassName="fi fi-ts-angle-right"></i>
            </div> */}
          </div>
          {/* <hr className="mt-5" /> */}
        </div>
      ))}
    </div>
  );
}

export default AllProducts;