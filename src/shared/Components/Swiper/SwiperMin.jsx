import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { containerVariants, fadeIn, slideVariants, } from "../../../framerMotion";
import { getallTrendingProducts } from "../../services/apiproducts/apiproduct";
import { Link } from "react-router-dom";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="animate-pulse">
          <div className="overflow-hidden rounded-2xl">
            <div className="bg-gray-200 rounded-2xl">
              <div className="p-3 md:p-5">
                <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
              </div>
              <div className="w-full h-8 bg-gray-300 rounded-b-2xl"></div>
            </div>
            <div className="relative">
              <div className="w-9/12 py-2 mx-auto -mt-1 bg-gray-300 rounded-b-3xl md:w-7/12">
                <div className="w-3/4 h-6 mx-auto bg-gray-400 rounded"></div>
              </div>
              <div className="relative -z-10 h-2.5">
                <div className="absolute w-3 h-3 bg-gray-300 rounded-full -bottom-0 -left-3"></div>
                <div className="absolute w-3 h-3 bg-gray-300 rounded-full -bottom-0 -right-3"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SwiperMin = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([]);


  // const trendingProducts = useCallback(async () => {
  //   try {
  //     const res = await getallTrendingProducts();
  //     console.log(res)
  //       setTrending(Array.isArray(res?.response) ? res.response : []);
  //   } catch (error) {
  //     console.error("Failed to fetch categories:", error);
  //   }
  // }, []);
  // useEffect(() => {
  //   trendingProducts();
  // }, [trendingProducts]);

  const trendingProducts = useCallback(async () => {
    try {
      const res = await getallTrendingProducts();

      console.log("API Response:", res); // Debugging log

      // Ensure response is valid and set trending safely
      setTrending(Array.isArray(res?.response) ? res.response : []);
    } catch (error) {
      console.error("Failed to fetch trending products:", error);
      setTrending([]); // Set empty array on error to avoid crashes
    }
  }, []);

  useEffect(() => {
    trendingProducts();
  }, [trendingProducts]);



  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (!banners2 || banners2.length === 0) {
  //   return <LoadingSkeleton />;
  // }

  // if (isLoading) {
  //   return <LoadingSkeleton />;
  // }

  return (
    <>
      <div className="w-full overflow-hidden swiper-container-wrapper group  ">
        <div className="swiper-container text-black"  >
          <Swiper loop={true} speed={500}
            breakpoints={{
              350: { slidesPerView: 2, spaceBetween: 10 },
              600: { slidesPerView: 2, spaceBetween: 15 },
              724: { slidesPerView: 2, spaceBetween: 15 },
              1500: { slidesPerView: 3, spaceBetween: 20 },
            }}
            navigation={{ nextEl: ".swiper-button-next5", prevEl: ".swiper-button-prev5", }}
            modules={[Navigation, Autoplay]}  >
            {trending.map((trend, index) => {
              return (
                <SwiperSlide key={index} >
                  <>  <Link to={`/product-details/${trend._id}`} state={{ product: trend }}>
                    <div key={index} target="_blank" rel="noopener noreferrer">
                      <div className=" rounded-2xl grid lg:grid-cols-2   lg:p-4  lg:!bg-primary">
                        <div className=' lg:flex flex-col justify-between   hidden' >
                          <div className="text-white w-fit  lg:space-y-2 ">
                            <p className="hidden lg:block text-[#FFD700] bg-black rounded-full w-fit text-[10px] lg:text-sm text-xs p-1 px-2 light ">Trending <i className="fi fi-ss-fire-flame-curved "></i></p>
                            <h2 className="xl:text-xl text-sm font-semibold line-clamp-2  " >{trend.Product_Name}</h2>
                            <p className=" w-fit text-sm lg:text-base">Up to {Math.round(trend.Discount)}% offer</p>
                          </div>
                          <button className=" text-left lg:my-2 mt-2 w-fit group/btn text-primary_green lg:block hidden">Grab Yours <i className="fi fi-rs-arrow-up-right text-sm"></i><div className="bg-white h-0.5 rounded-full w-0 lg:group-hover/btn:w-full hidden lg:block duration-300"></div></button>
                        </div>
                        <div className="  overflow-hidden  rounded-lg ">
                          <p className="lg:hidden absolute top-5 left-5  bg-black rounded-full w-fit lg:text-sm text-xs   px-2 inline-flex flex-nowrap text-[#FFD700] gap-1 py-1  light">Trending <i className="fi fi-ss-fire-flame-curved flex justify-center items-center "></i></p>
                          {/* <img src={`${prod.preview}`} alt={prod.title} className="object-cover rounded-lg  w-full lg:h-full" /> */}
                          <img className="rounded-lg lg:h-56 w-full" key={`${index}`} src={`${apiurl()}/${trend?.Images[0]}`} alt={`Product ${index + 1}`} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  </>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        {/* <div ref={prevRef} className="swiper-button-prev5 hidden lg:flex opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 bg-white/70 absolute z-10 top-[30%] left-0 cursor-pointer h-[30%]  items-center rounded-r-full duration-300 group/bg"><img src="/assets/megaoffers/swiperbtn2.svg" alt="" className=" w-3 xsm:w-auto cursor-pointer !rotate-180  px-2 group-active/bg:-translate-x-2 duration-200" /></div>
        <div ref={nextRef} className="swiper-button-next5  hidden lg:flex opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-0 bg-white/70 absolute z-10 top-[30%] right-0 cursor-pointer h-[30%] items-center rounded-l-full duration-300 group/bg"><img src="/assets/megaoffers/swiperbtn2.svg" alt="" className="w-3 px-2 duration-200 cursor-pointer xsm:w-auto group-active/bg:translate-x-2" /></div> */}
      </div>
    </>
  );
};

export default SwiperMin;