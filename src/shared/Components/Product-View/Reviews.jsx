import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import apiurl from '../../services/apiendpoint/apiendpoint';

function Reviews({ reviewData, reviewTotalLength }) {

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };


    return (
        <>
            <section className='px-3 '>
                <div className='flex items-center justify-between my-5 '>
                    <div className='flex items-center'>
                        <div className="z-10 rounded-full ">
                            <img className='w-10 md:w-20' src="/images/Design/Dd.png" alt="" />
                        </div>
                        <div className="flex items-center bg-[#38031D] dark:bg-zinc-200 relative right-8  text-[#EFA61B] w-fit h-fit md:text-xl text-base md:p-2 p-1 rounded-full">
                            <span className="px-2 ml-5 text-sm md:px-3 md:text-base dark:text-black"> Reviews ({reviewTotalLength})</span>
                        </div>
                    </div>

                </div>
                <div className='relative '>
                    <Swiper spaceBetween={30} slidesPerView={1} loop={true}
                        modules={[Pagination, Autoplay]}
                        // autoplay={{
                        //     delay: 1500,
                        //     disableOnInteraction: false,
                        // }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1320: { slidesPerView: 3 },
                            1670: { slidesPerView: 3 },
                            1680: { slidesPerView: 5 },
                        }}
                    >
                        {reviewData.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[url('/images/Design/Testimonial.png')] bg-cover shadow-md  space-y-4  rounded-3xl my-2 cursor-pointer py-3">

                                    <div className='flex items-center justify-center gap-4'>
                                        <div className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#F07721] ring-2 ring-white">
                                            <span className="text-lg font-bold text-white">
                                                {testimonial.Reviewer.First_Name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className=" text-lg font-bold text-[#269C53]" >{testimonial.Reviewer.First_Name}</h3>
                                            <h3 className=" text-lg font-bold text-[#269C53]" >{formattedDate(testimonial.Date)}</h3>
                                        </div>
                                    </div >
                                    <p className="mt-4 text-sm text-center md:text-lg px-7">{testimonial.Review_Description}</p>
                                    <div className="mt-2 text-center">
                                        {'⭐'.repeat(testimonial.Star_Rating)}
                                    </div>
                                    <div className=''>
                                        <img className='mx-auto w-60' src={`${apiurl()}/${testimonial.Images[0]}`} alt="" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default Reviews
