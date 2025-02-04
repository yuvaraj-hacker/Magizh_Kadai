import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

function Testimoni({ testimonials }) {
  return (
    <>
      <section className=" my-5 ">
        <div className="flex gap-2 flex-col items-center justify-center">
          <h2 className="lg:text-3xl font-semibold text-secondary"> Testimonials</h2>
          {/* <p className="text-sm px-3">  Our references are very valuable, the result of a great effort...</p> */}
        </div>
        <div className="relative  2xl:px-0 px-3">
          <Swiper spaceBetween={30} slidesPerView={1} autoplay loop={true} modules={[Pagination, Autoplay]}
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1320: { slidesPerView: 3 }, 1670: { slidesPerView: 3 }, 1680: { slidesPerView: 5 }, }}  >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col justify-between bg-white border shadow-md   space-y-4 my-5 text-center rounded-xl p-4 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <img className="w-14 h-14" src={testimonial.avata} />
                    <div className="text-start"> <h3 className="whitespace-nowrap mt-2 text-base lg:text-lg font-bold text-gray-700 text-start">
                      {testimonial.name} </h3>
                      <p className="text-gray-500 text-sm">{testimonial.qualification}</p></div>
                  </div>
                  <p className="text-justify text-sm md:text-base dark:text-black line-clamp-4">  "{testimonial.text}" </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Testimoni;
