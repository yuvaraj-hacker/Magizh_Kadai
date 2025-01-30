import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";
import { fadeIn } from "../../../framerMotion";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1">
      {[1, 2, 3].map((item) => (
        <div key={item} className="relative overflow-hidden bg-gray-200 rounded-3xl animate-pulse">
          <div className="grid h-48 grid-cols-12">
            <div className="flex flex-col items-start justify-center col-span-5 gap-2 px-5">
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="col-span-7 bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SwiperMax = ({ banners }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!banners || banners.length === 0) {
    return <LoadingSkeleton />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full swiper-container-wrapper">
      <div className="swiper-container">
        <Swiper loop={true}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          speed={2000}
          breakpoints={{
            320: { slidesPerView: 1 },
            600: { slidesPerView: 1 },
            1224: { slidesPerView: 1 },
          }}
          navigation={banners.length > 1 ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : false}
          modules={[Navigation, Autoplay]}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div>
                <div className={`relative overflow-hidden rounded-3xl h-[calc(50vh)] 2xl:h-[460px] `}
                  style={{
                    backgroundImage: window.innerWidth < 1024
                      ? `linear-gradient(to top left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(http://192.168.29.175:5173/${banner.image})`
                      : `linear-gradient(to bottom left, ${banner.bgColor}, ${banner.bgColor}70)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }} >
                  <div className="lg:grid grid-cols-12 h-full">
                    <div className="z-10 flex flex-col items-start justify-center col-span-7 gap-2 px-5 text-white lg:pt-7 lg:pl-40 sm:pl-14 pl-7 align-middle self-center h-full">
                      <div
                        className="text-[30px] xsm:text-[35px] sm:text-[35px] md:text-[40px] lg:text-[35px] leading-6 xl:text-[36px] 2xl:text-[48px] 3xl:text-[65px] 3xl:leading-10 font-jomhuria text-secondary lg:text-black" >
                        {banner.title}
                      </div>
                      <div
                        className="2xl:text-xl sm:text-base text-sm lg:text-gray-600 text-white" style={{ color: banner.textColor }}>{banner.subtitle}</div>
                      <div
                        className="text-secondary contrast-150 ">Starting From <span className=" text-xl font-semibold ">₹129</span> </div>
                      <div
                      ><Link to={banner.link} ><button className="p-5 border border-primary_green lg:border-primary rounded-full text-primary_green lg:text-primary mt-5">Shop Now <i class="fi fi-br-arrow-up-right text-sm pl-2"></i></button></Link>
                      </div>
                    </div>
                    <img src={`http://192.168.29.175:5173/${banner.image}`} alt={banner.title} className="w-full h-full object-cover col-span-5 " />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperMax;