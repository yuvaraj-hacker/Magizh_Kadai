
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function DealSwiper({ Deals, styles }) {

  return (
    <>
      <div className="mx-auto swiper-container-wrapper">
        <div className="relative pt-10 pb-5 overflow-hidden rounded-3xl px-7 group/main"
          style={{
            background: `linear-gradient(to bottom, ${styles?.BGColor1 || "#DCFFFC"}, ${styles?.BGColor2 || "#FFFFFF"
              })`,
          }}
        >
          <Swiper loop={true} speed={1000} spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1 },
              460: { slidesPerView: 2 },
              1120: { slidesPerView: 3 },
          
              1200: { slidesPerView: 4 },
              1500: { slidesPerView: 5 },
            }}
            navigation={{
              nextEl: ".swiper-button-nextdeal",
              prevEl: ".swiper-button-prevdeal",
            }}
            modules={[Navigation, Autoplay]}
          >
            {Deals.map((prod) => (
              <SwiperSlide key={prod._id}>

                <div className="relative px-2 pb-5 group">
                  <div className="relative w-full pt-4 shadow-md cursor-pointer border-3 rounded-3xl"
                    style={{
                      backgroundColor: styles?.CardColor || "#FFFFFF",
                      borderColor: styles?.CardBorderColor || "#007369",
                    }}
                  >
                    <Link to={`/product-details/${prod._id}`} state={{ product: prod }}>
                      <div className="flex items-center justify-center">
                        <img src={prod.img} alt={prod.Product_Name} className="" style={{ height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                      </div>
                    </Link>
                    {prod?.Discount > 0 && (
                    <div
                      className="absolute p-1 text-sm font-bold rounded-lg top-2 right-3"
                      style={{
                        backgroundColor: styles?.ButtonBGColor || "#D90028",
                        color: styles?.ButtonTextColor || "#FFFFFF",
                      }}
                    >
                      {prod.Discount}% OFF
                    </div>
                    )}
                    {/* <div className='absolute flex items-center -bottom-4 -right-2' onClick={() => { toast.success('Added To Cart Successfully') }}>
                            <div className='relative border border-[#269C52] bg-white px-2 py-1 z-40 rounded-3xl plus-button group-hover:bg-[#269C52] duration-300'>
                                  <i className="fi fi-rr-plus-small text-2xl text-[#269C52] group-hover:text-white  mt-7 relative top-1" ></i>
                            </div>
                        </div> */}
                    <div className="h-24 p-2 mt-3 text-center text-white rounded-2xl" style={{ backgroundColor: styles?.TextBgColor || "#007369" }} >
                      <h2 className="mt-3 text-sm md:text-base" style={{ color: styles?.TextColor || "#FFFFFF" }} >
                        {prod.Product_Name}
                      </h2>
                      <h3 className="text-sm font-semibold" style={{ color: styles?.PriceColor || "#FFFFFF" }}
                      >{prod && prod.Sale_Price > 0 ? (
                        `$${prod.Sale_Price}`
                      ) : null}
                      
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute left-0 duration-300 -translate-x-full -translate-y-1/2 opacity-0 top-1/2 group-hover/main:translate-x-0 group-hover/main:opacity-100">
            <img className="px-2 swiper-button-prevdeal" src="/images/Design/Vector 16.png" alt="" />
          </div>
          <div className="absolute right-0 duration-300 translate-x-full -translate-y-1/2 opacity-0 top-1/2 group-hover/main:translate-x-0 group-hover/main:opacity-100">
            <img className="px-2 swiper-button-nextdeal" src="/images/Design/Vector 15.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
