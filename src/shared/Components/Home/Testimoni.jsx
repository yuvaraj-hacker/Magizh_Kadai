import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

function Testimoni({ testimonials }) {
  return (
    <>
      <section className="px-3 lg:px-5 pb-3">
        <div className="flex gap-3 flex-col items-center justify-center py-5">
          <h2 className="lg:text-3xl font-semibold text-secondary"> Product Reviews</h2>
           <p className="text-sm">  Our references are very valuable, the result of a great effort...</p>
        </div>
        <div className="relative ">
          <Swiper spaceBetween={30} slidesPerView={1} autoplay loop={true} modules={[Pagination, Autoplay]} 
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1320: { slidesPerView: 3 },
              1670: { slidesPerView: 3 },
              1680: { slidesPerView: 5 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className= "flex flex-col justify-between bg-white border p-3 py-5 lg:py-8 shadow-lg space-y-4 text-center rounded-3xl my-2 mb-5 cursor-pointer h-[250px]"> 
                  <p className=" text-justify text-sm md:text-sm px-7 dark:text-black">
                    {testimonial.text} </p> 
                    <div className="flex items-center gap-4 px-7 ">
                      <img className="w-14 h-14" src={testimonial.avata} />
                      <div className="text-start"> <h3 className="whitespace-nowrap mt-2 text-base lg:text-lg font-bold text-gray-700 text-start">
                      {testimonial.name} </h3>
                      <p className="text-gray-500 text-sm">{testimonial.qualification}</p></div>
                     
                    </div>
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
