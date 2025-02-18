import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { Link } from "react-router-dom";

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
      <div className="swiper-container rounded-3xl h-fit mt-3 md:mt-5  ">
        <Swiper loop={true} autoplay={{ delay: 5000 }} spaceBetween={10} speed={2000}
          breakpoints={{ 320: { slidesPerView: 1 }, 600: { slidesPerView: 1 }, 1224: { slidesPerView: 1 }, }}
          navigation={banners.length > 1 ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : false}
          modules={[Navigation, Autoplay]}
          pagination={{
            el: ".swiper-pagination", clickable: true, renderBullet: function (index, className) {
              return `<spanclassName="${className}" style="width: 20px; height: 4px; border-radius: 2px;"></span>`;
            },
          }}  >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div>
                <div className={`relative overflow-hidden  rounded-3xl `}
                  style={{
                    backgroundImage: window.innerWidth < 1024
                      ? `linear-gradient(to top left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(https://www.magizhkadai.com/${banner.image})`
                      : `linear-gradient(to bottom left, ${banner.bgColor}, ${banner.bgColor}70)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }} >
                  {/* <div className="lg:grid grid-cols-2 h-full gap-10">
                    <img src={`http://192.168.29.175:5173/${banner.image}`} alt={banner.title} className="h-96 w-full object-cover  md:block hidden" />
                    <div className="z-10  flex justify-center items-center p-3">
                      <div>
                        <div className=" font-jomhuria text-secondary lg:text-black md:text-7xl text-3xl" >
                          {banner.title}
                        </div>
                        <div
                          className="2xl:text-xl sm:text-base text-sm lg:text-gray-600 text-white" style={{ color: banner.textColor }}>{banner.subtitle}</div>
                        <div
                          className="text-secondary contrast-150 ">Starting From <span className=" text-xl font-semibold ">₹129</span> </div>
                        <div><Link to={banner.link} ><button className="p-5 border border-primary_green lg:border-primary rounded-full text-primary_green lg:text-primary mt-5">Shop Now <i className="fi fi-br-arrow-up-right text-sm pl-2"></i></button></Link>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="relative flex items-center justify-center text-center text-white md:py-10 py-5 overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(2, 74, 52, 0.4), rgba(2, 74, 52, 0.4)), url(https://www.magizhkadai.com/${banner.image})`, backgroundSize: "cover",
                      backgroundPosition: "center", backgroundRepeat: "no-repeat",
                    }}  >
                    <div className="z-10 px-5 max-w-2xl md:space-y-4 space-y-2">
                      <div className="font-jomhuria text-white md:text-7xl text-5xl">
                        {banner.title}
                      </div>
                      <div className="2xl:text-xl sm:text-base text-sm  text-white" style={{ color: banner.textColor }}  >
                        {banner.subtitle}
                      </div>
                      {/* <div className="text-secondary contrast-150">
                        Starting From <span className="text-xl font-semibold">₹129</span>
                      </div> */}
                      {/* <div className="">
                        <Link to={banner.link}>
                          <button className="md:p-3 p-2 border border-white lg:border-secondary rounded-full group   text-secondary">
                            <p className="group-hover:text-secondary"> Shop Now <i className="fi fi-br-arrow-up-right text-sm  group-hover:text-secondary"></i></p>
                          </button>
                        </Link>
                      </div> */}
                      <div className="">
                        <Link to={banner.link}>
                          <button className="md:p-3 p-2 bg-[#024a34] rounded-full text-[#DBA737] border-2 border-[#DBA737] transition-all duration-300 hover:bg-[#036049] hover:text-white">
                            <p className="flex items-center gap-2">
                              Shop Now
                              <i className="fi fi-br-arrow-up-right text-sm"></i>
                            </p>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {banners.length > 1 && (
          <>
            <div className="swiper-button-prev absolute z-10   text-white cursor-pointer ">
            </div>
            <div className="swiper-button-next absolute z-10 text-white cursor-pointer ">
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default SwiperMax;