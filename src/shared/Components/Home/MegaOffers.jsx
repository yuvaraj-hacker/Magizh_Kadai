import { useRef, useState, useEffect } from "react";
import "./MegaOffer.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const MegaOffers = ({ title, products, styles, border }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      prevRef.current.classList.add("custom-swiper-prev");
      nextRef.current.classList.add("custom-swiper-next");
    }
  }, []);



  return (
    <section className="w-full px-3 pt-2 bg-white lg:p-5 lg:mt-0">
      <div className="w-full mb-3 rounded-3xl">
        {/* Top Design */}
        <div className="relative flex items-end justify-center w-10/12 mx-auto lg:w-3/4 xl:w-1/2">
          <svg className="w-full translate-y-2" viewBox="0 0 845 183" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M121.5 137C56.3 127.4 13.3333 163.333 0 182.5H845C829.4 141.3 764.5 135 734 137C706.4 68.1998 623.833 71.9994 586 82.4993C508 82.4993 454.167 27.4998 437 0C377.8 78 307.333 87.4995 279.5 82.4993C187.9 55.6993 136 107.666 121.5 137Z"
              fill={styles.BGColor || "#540045"}
            />
          </svg>
          <h1 className="absolute text-center translate-y-3 xsm:text-xl sm:translate-y-0 sm:text-2xl xl:text-4xl 3xl:text-4xl font-agbalumo" style={{ color: styles.titleColor || "#ffff" }}>
            {title || "Mega Offers"}
          </h1>
          {/* Border Images */}
          {!border || border === "Border_1" ? (
            <>
              <img src="/assets/megaoffers/flower.png" alt="" className="absolute w-12 -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 lg:w-24 animate-infinite animate-wiggle-more animate-duration-[4s] z-10" />
              <img src="/assets/megaoffers/flower.png" alt="" className="absolute w-12 -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 lg:w-24 animate-infinite animate-wiggle-more animate-duration-[4s] z-10" />
            </>
          ) : border === "Border_2" ? (
            <>
              <img src="/assets/topdiscount/rangoli 64.png" alt="" className="absolute w-12 -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 lg:w-24 animate-infinite animate-wiggle-more animate-duration-[4s] z-10" />
              <img src="/assets/topdiscount/rangoli 64.png" alt="" className="absolute w-12 -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 lg:w-24 animate-infinite animate-wiggle-more animate-duration-[4s] z-10" />
            </>
          ) : null}
        </div>

        {/* Inner Content */}
        <div className="w-full bg-contain rounded-3xl" style={{ backgroundColor: styles.BGColor || "#540045" }}>
          <div className="relative w-full p-5 swiper-container-wrapper md:p-16">

            <div className="swiper-container">
              <Swiper
                loop={false}
                speed={700}
                autoplay={{ delay: 3000 }}
                spaceBetween={20}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  350: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                  1500: { slidesPerView: 5 },
                  1650: { slidesPerView: 6 },
                }}
                onInit={(swiper) => {
                  setAtStart(swiper.isBeginning);
                  setAtEnd(swiper.isEnd);
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                onSlideChange={(swiper) => {
                  setAtStart(swiper.isBeginning);
                  setAtEnd(swiper.isEnd);
                }}
                modules={[Navigation, Autoplay]}
              >
                {products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <Link to={`/product-details/${product._id}`} state={{ product }} className="block"  >
                      <div
                        className="relative p-3 overflow-hidden cursor-pointer rounded-2xl lg:min-h-48 group"
                        style={{ borderColor: styles.CardBorderColor || "transparent", borderWidth: "2px", borderStyle: "solid", backgroundColor: styles.CardBackgroundColor || "#FFFFFF", }}   >
                        {/* Product Image */}
                        <div
                          className="h-[120px] flex justify-center items-center p-2 overflow-hidden rounded-lg"
                          style={{ borderColor: styles.CardImageBorderColor || "transparent", borderWidth: "2px", borderStyle: "solid", }}  >
                          <img src={product.img} alt={product.Product_Name} className="object-cover w-auto h-full duration-300 scale-95 group-hover:scale-105" />
                        </div>
                        {/* Product Name */}
                        <p className="pt-1 text-xs sm:text-sm lg:pl-2 card-title whitespace-nowrap" style={{ color: styles.CardTextColor || "#000000" }}>
                          {product.Product_Name}
                        </p>
                        {/* Discount Text */}
                        <p
                          className="pl-1 text-xs font-semibold duration-100 border-l-4 card-description lg:border-l-0 lg:group-hover:border-l-4 whitespace-nowrap"
                          style={{ color: styles.DiscountTextColor || "#FF0000", borderColor: styles.DiscountBorderColor || "#de1f25", }} >
                          UP TO {product.Discount || 0}% OFF
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Buttons */}
            <div
              ref={prevRef}
              className={`${atStart ? "hidden" : "inline-block"} z-10 rounded-r-full pr-3 py-5 absolute top-1/2 left-0 transform -translate-y-1/2`}
              style={{ backgroundColor: styles.BGColor || "#540045" }}
            >
              <img src="/assets/megaoffers/swiperbtn.svg" alt="Previous" className="w-3 ml-5 rotate-180 cursor-pointer xsm:w-auto" />
            </div>
            <div
              ref={nextRef}
              className={`${atEnd ? "hidden" : "inline-block"} z-10 rounded-l-full pl-3 py-5 absolute top-1/2 right-0 transform -translate-y-1/2`}
              style={{ backgroundColor: styles.BGColor || "#540045" }}
            >
              <img src="/assets/megaoffers/swiperbtn.svg" alt="Next" className="w-3 mr-5 cursor-pointer xsm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MegaOffers;
