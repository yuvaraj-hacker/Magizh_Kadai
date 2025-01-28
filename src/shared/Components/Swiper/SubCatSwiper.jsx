import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import apiurl from '../../services/apiendpoint/apiendpoint';

const LoadingSkeleton = () => {
  const [itemCount, setItemCount] = useState(1);

  useEffect(() => {
    const updateItemCount = () => {
      setItemCount(window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 3 : 1);
    };
    updateItemCount(); 
    window.addEventListener("resize", updateItemCount);

    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return (
    <div className="relative w-full swiper-container-wrapper md:px-10">
      <div className="swiper-container">
        <div className="flex gap-4">
          {Array.from({ length: itemCount }).map((item , i) => (
            <div
              key={item || i}
              className="w-full md:w-1/3 lg:w-1/5 h-[120px] bg-gray-200 rounded-xl animate-pulse"
              style={{ flexShrink: 0 }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gray-300"></div>
                <div className="absolute bottom-0 w-full h-6 bg-gray-400 rounded-b-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SubCatSwiper = ({ categories, selectedCategory, activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubcategoryClick = (subcategory, index) => {
    setActiveIndex(index);
    navigate(`/products?category=${encodeURIComponent(selectedCategory)}&subcategory=${encodeURIComponent(subcategory.name)}`);
  };

  const filteredSubcategories = categories.reduce((acc, category) => {
    if (category.Category_Name === selectedCategory) {
      const subcategories = category.Subcategories || [];
      return [...acc, ...subcategories.map(sub => ({
        ...sub,
        parentCategory: category.Category_Name,
        parentColor: category.Card_color || '#000000'
      }))];
    }
    return acc;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!filteredSubcategories || filteredSubcategories.length === 0) {
    return <LoadingSkeleton />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (filteredSubcategories.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        No subcategories available for {selectedCategory}
      </div>
    );
  }

  return (
    <div className="relative w-full swiper-container-wrapper md:px-10">
      <div className="swiper-container">
        <Swiper key={selectedCategory} loop={filteredSubcategories.length > 5} speed={500} slidesPerGroup={1}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 5 },
            350: { slidesPerView: 2, spaceBetween: 10 },
            850: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 15 },
            1450: { slidesPerView: 4, spaceBetween: 15 },
            1650: { slidesPerView: 5, spaceBetween: 15 },
          }}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
         }}
        >
          
          {filteredSubcategories.map((subcategory, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleSubcategoryClick(subcategory, i)}
                className={`p-0.5 mb-8 rounded-[14px] border-2 cursor-pointer ${
                  activeIndex === i ? 'border-2 shadow-lg' : 'border-transparent'
                }`}
                style={{
                  borderColor: activeIndex === i ? subcategory.Subcategory_Color : 'transparent',
                  boxShadow: activeIndex === i ? `0 4px 6px -1px ${subcategory.Subcategory_Color}33` : 'none'
                }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative">
                    <img src={`${apiurl()}/${subcategory.image}`} alt={subcategory.name} className="object-cover w-full transition-transform duration-300 h-28"/>
                    <div className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, ${subcategory.Subcategory_Color}11, ${subcategory.Subcategory_Color}33)`
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 w-full p-1 rounded-lg" style={{backgroundColor: subcategory.Subcategory_Color + 'ee' }}>
                    <h2 className="font-agbalumo text-center py-0.5 sm:py-1 sm:text-2xl text-white">
                      {subcategory.name}
                    </h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Navigation */}
      <button ref={prevRef}
        className="hidden md:flex swiper-button-prev1 cursor-pointer z-10 rounded-full absolute top-1/2 left-0 -translate-x-2 -translate-y-2/3 p-1 h-10 w-10 bg-[#fff7f5] shadow-lg justify-center items-center"
      >
        <svg width="10" className="rotate-180" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 13.5L0 0L6.63158 13.5L0 27L14 13.5Z" fill="#2E1216"/>
        </svg>
      </button>

      <button ref={nextRef}
        className="hidden md:flex swiper-button-next1 cursor-pointer z-10 rounded-full absolute top-1/2 right-0 translate-x-2 -translate-y-2/3 p-1 h-10 w-10 bg-[#fff7f5] shadow-lg justify-center items-center"
      >
        <svg width="10" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 13.5L0 0L6.63158 13.5L0 27L14 13.5Z" fill="#2E1216"/>
        </svg>
      </button>

      {/* Mobile Navigation */}
      <button ref={prevRef}
        className="md:hidden swiper-button-prev1 cursor-pointer z-10 rounded-full absolute -mt-3 top-1/2 left-2 -translate-y-1/2 p-2 h-8 w-8 bg-green-500 shadow-lg flex justify-center items-center sm:left-0 sm:-translate-x-2 sm:h-10 sm:w-10 sm:bg-[#fff7f5] hover:bg-gray-50 active:scale-95 transition-all duration-300 ease-in-out hover:-translate-x-1 animate-fade-in"
      >
        <svg width="8" className="transition-transform duration-300 rotate-180 sm:w-10 group-hover:scale-110" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 13.5L0 0L6.63158 13.5L0 27L14 13.5Z" fill="#2E1216" className="transition-colors duration-300 hover:fill-gray-800"/>
        </svg>
      </button>

      <button ref={nextRef}
        className="md:hidden swiper-button-next1 cursor-pointer z-10 rounded-full absolute -mt-3 top-1/2 right-2 -translate-y-1/2 p-2 h-8 w-8 bg-green-500 shadow-lg flex justify-center items-center sm:right-0 sm:translate-x-2 sm:h-10 sm:w-10 sm:bg-[#fff7f5] hover:bg-gray-50 active:scale-95 transition-all duration-300 ease-in-out hover:translate-x-1 animate-fade-in"
      >
        <svg width="8" className="transition-transform duration-300 sm:w-10 group-hover:scale-110" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 13.5L0 0L6.63158 13.5L0 27L14 13.5Z" fill="#2E1216" className="transition-colors duration-300 hover:fill-gray-800"/>
        </svg>
      </button>
    </div>
  );
};