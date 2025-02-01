import { useEffect, useState, useCallback } from "react";
import SwiperMin from "./SwiperMin";
import { getallproducts } from "../../services/apiproducts/apiproduct";
import { products1 } from '../../services/json/heroSection.js'
import { Link } from "react-router-dom";
import apiurl from "../../services/apiendpoint/apiendpoint.js";

function AllProducts({ groupedProducts }) {
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
    <div className="relative">
      {/* {Object.entries(products).map(([tag, tagProducts]) => (
        <section key={tag} className="mx-auto ">
          <SwiperMin product={tagProducts} title={tag} />
        </section>
      ))} */}

      {Object.keys(groupedProducts || {}).map((category, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center my-2">
            <h2 className=" text-2xl font-semibold text-secondary">{category}</h2>
            <Link to={`products?category=${category}`} className="h-fit sm:h-full   p-2 lg:px-4 rounded-full border group bg-primary text-white flex gap-2 justify-center items-center  group/vwbtn *:duration-300"><button className="text-sm lg:text-base flex gap-2 items-center">View All <i className="fi fi-sr-angle-circle-right flex items-center group-hover:translate-x-1 duration-300 "></i></button></Link>
          </div>
          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 ">
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
              {groupedProducts[category].slice(0, 6).map((product, idx) => (
                <div key={idx} className="flex flex-col group duration-300 p-3 space-y-3 from-[#70c2a9] via-primary to-primary hover:to-[#8ad1bc] shadow-sm  hover:via-primary hover:from-primary rounded-xl border hover:border-primary hover:bg-gray-100">
                  <div className="border h-40 md:h-60 overflow-hidden rounded-xl flex items-center justify-center bg-white">
                    <img src={`${apiurl()}/${product?.Images[0]}`} alt={product.Product_Name || 'Product'} className="object-cover h-full w-full group-hover:scale-105 bg-white duration-300" />
                  </div>
                  <div className=" ">
                    <p className="line-clamp-2 text-gray-500 lg:text-base text-sm group-hover:text-gray-700">{product.Product_Name || 'No Name Available'}</p>
                    <div className="text-end ">
                      <Link to={`/product-details/${product._id}`} className=" "><i className="fi fi-sr-angle-circle-right flex items-center justify-end text-3xl text-primary"></i></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <hr className="mt-5" /> */}
        </div>
      ))}
    </div>
  );
}

export default AllProducts;