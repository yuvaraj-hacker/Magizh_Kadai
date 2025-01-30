import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { containerVariants, fadeIn, slideVariants, } from "../../../framerMotion";

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



const SwiperMin = ({ banners2 = [], minStyles }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!banners2 || banners2.length === 0) {
    return <LoadingSkeleton />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className="w-full overflow-hidden swiper-container-wrapper group">
        <div className="swiper-container "  >
          <Swiper loop={true} speed={500}
            breakpoints={{
              350: { slidesPerView: 2, spaceBetween: 10 },
              600: { slidesPerView: 2, spaceBetween: 15 },
              724: { slidesPerView: 3, spaceBetween: 15 },
              1500: { slidesPerView: 3, spaceBetween: 20 },
            }}
            navigation={{
              nextEl: ".swiper-button-next5",
              prevEl: ".swiper-button-prev5",
            }}
            modules={[Navigation, Autoplay]}
          >
            {banners2.map((prod, i) => {
              return (
                <SwiperSlide key={prod.id} >
                  <div variants={slideVariants} href={prod.link} target="_blank" rel="noopener noreferrer">
                    <div className=" rounded-2xl overflow-hidden flex flex-wrap-reverse lg:flex-nowrap justify-between !bg-primary" style={{ backgroundColor: prod.bgColor }}>
                      <div className=' flex flex-col justify-between whitespace-nowrap p-5 pr-0 2xl:pl-10 2xl:py-10' >
                        <div className="text-white w-fit  lg:space-y-2">
                          <p className="hidden lg:block text-primary bg-white rounded-full w-fit text-[10px] lg:text-sm p-1">Trending <i class="fi fi-ss-fire-flame-curved"></i></p>
                          <h2 className="xl:text-xl text-sm font-semibold" > {prod.title}</h2>
                          <p className=" w-fit text-sm lg:text-base">Up to {prod?.subtitle}% off Catalog</p>
                        </div>
                        <button className=" text-left lg:my-2 mt-2 w-fit group/btn text-primary_green">Collection <i class="fi fi-rs-arrow-up-right text-sm"></i><div className="bg-white h-0.5 rounded-full w-0 lg:group-hover/btn:w-full hidden lg:block duration-300"></div></button>
                      </div>
                      <div className="p-3 overflow-hidden lg:p-5 relative h-[150px] lg:h-[200px]  2xl:h-[275px] rounded-lg ">
                        {/* <img src={`${apiurl()}/${prod.preview}`} alt={prod.title} className="object-cover w-full rounded-lg" /> */}
                        <p className="lg:hidden absolute top-5 left-5 text-primary_green bg-black rounded-full w-fit text-sm p-1 px-2 inline-flex flex-nowrap">Trending <i class="fi fi-ss-fire-flame-curved pl-1"></i></p>
                        <img src={`${prod.preview}`} alt={prod.title} className="object-cover rounded-lg  w-full lg:h-full" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
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