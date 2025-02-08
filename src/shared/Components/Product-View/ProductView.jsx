import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SimilerItem from './SimilerItem';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { Link } from 'react-router-dom';
import RegisterContinueGoogle from '../Register-ContiGoogle/RegisterContiGoogle';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { div } from 'framer-motion/m';
import Slider from 'react-slick';

const ProductView = (props) => {
  const tabRefs = useRef([]);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check screen size
  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: isMobile ? 0 : -100, // Vertical on large screens
        left: isMobile ? -100 : 0, // Horizontal on mobile
        behavior: "smooth",
      });
    }
  };
  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: isMobile ? 0 : 100, // Vertical on large screens
        left: isMobile ? 100 : 0, // Horizontal on mobile
        behavior: "smooth",
      });
    }
  };
  const { product, mainImage, setMainImage, mainImageRef, zoomStyle, handleMouseMove, contentHeight, handleMouseLeave, getCurrentCartQuantity, handleAddToCart, handleDelete, handleDecreaseQuantity,
    handleIncreaseQuantity, handleAddToWishlist, wishlistData, setIsTooltipVisible, isTooltipVisible, setIsDescriptionOpen, isDescriptionOpen, descriptionRef, similarItems,
    visible, setVisible
  } = props

  return (
    <>
      <div className='dark:bg-black  max-w-[80rem] mx-auto   md:my-10 my-5'>
        <div className="grid xl:grid-cols-9 grid-cols-6 md:gap-10 gap-2  md:space-x-8 px-3 max-w-[120rem] ">
          <div className='order-2 col-span-6 gap-2 md:col-span-1 md:order-1 ' >
            <div className="flex flex-row items-center overflow-x-auto overflow-y-hidden md:flex-col px-1 md:space-y-3 md:space-x-0 space-x-2 scrollbar-hide   place-items-center p-2 ">
              <button onClick={scrollUp} className="p-1 bg-gray-200 rounded hover:bg-gray-300 md:w-full h-full md:h-auto  flex justify-center items-center focus:ring-2 ring-primary  ">
                {isMobile ? <ChevronLeftIcon className="md:w-6 md:h-6 w-4 h-4 text-gray-600" /> : <ChevronUpIcon className="md:w-6 md:h-6 w-4 h-4 text-gray-600" />}
              </button>
              <div className=' md:max-h-96 md:h-96 overflow-hidden md:space-y-3 md:space-x-0 space-x-3 md:flex-col flex flex-row items-center overflow-x-auto scrollbar-hide  place-items-center ' ref={containerRef}>
                {product.Images.map((img, index) => (
                  <img key={index} src={`${apiurl()}/${img}`} alt={`Thumbnail ${index + 1}`}
                    ref={(el) => (tabRefs.current[index] = el)} className={`w-20 h-20 border  ${mainImage === img ? 'border-secondary' : 'border-gray-300 '} rounded cursor-pointer p-2`}
                    // onClick={() => setMainImage(img)}
                    onMouseEnter={() => setMainImage(img)}
                  />
                ))}
              </div>
              <button onClick={scrollDown} className="p-1 bg-gray-200 rounded hover:bg-gray-300  md:w-full h-full flex justify-center items-center focus:ring-2 ring-primary ">
                {isMobile ? <ChevronRightIcon className="md:w-6 md:h-6 w-4 h-4 text-gray-600" /> : <ChevronDownIcon className="md:w-6 md:h-6 w-4 h-4 text-gray-600" />}
              </button>
            </div>
          </div>
          <div className="flex-1 order-1 col-span-6  mx-auto overflow-hidden rounded-lg xl:col-span-4 lg:col-span-3 md:col-span-4 md:order-2 m-2 place-items-center w-full "   >
            <div className="relative" ref={mainImageRef} style={zoomStyle} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
              <img src={`${apiurl()}/${mainImage}`} alt="Main product" className="   md:min-h-96 min-h-52  md:max-h-96" />
            </div>
          </div>
          {/* <div className="flex-1 order-1 col-span-6 mx-auto overflow-hidden rounded-lg xl:col-span-4 lg:col-span-3 md:col-span-3 md:order-2 place-items-center ">
          {!isMobile ? (
            <div
              className="relative"
              ref={mainImageRef}
              style={zoomStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave} >
              <img
                src={`${apiurl()}/${mainImage}`}
                alt="Main product"
                className="object-contain max-h-96 w-96"
              />
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
            >
              {product.Images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${apiurl()}/${mainImage}`}
                    alt={`Product ${index + 1}`}
                    className="object-contain max-h-96 w-96"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div> */}
          <div className="order-3 col-span-6 md:mt-5 md:space-y-4 space-y-2 xl:col-span-4 md:col-span-4 md:order-3  m-2 xl:mt-0 ">
            {/* <div className="flex items-center space-x-4">
            {product.Brand_Name && (
              <p className="inline-block text-xs font-medium">
                {product.Brand_Name}
              </p>
            )}
            {product.Measurement_Units && product.Unit_of_Measurements && (
                <span className="text-lg font-medium text-gray-600">
                {product.Measurement_Units} per {product.Unit_of_Measurements}
              </span>
            )}
            </div> */}
            <div className="flex items-center space-x-4">
              {product.Brand_Name && (
                <p className="inline-block md:px-4 px-3 md:py-2 py-1 md:text-sm text-xs font-semibold text-black bg-green-500 rounded-3xl bg-opacity-20 dark:bg-green-300">{product.Brand_Name}</p>
              )}
              {product.Measurement_Units && product.Unit_of_Measurements && (
                <span className="text-lg font-medium text-gray-600 dark:text-white">{product.Measurement_Units} per {product.Unit_of_Measurements}</span>
              )}
            </div>
            <div className='flex flex-wrap items-end justify-start'>
              <h1 className="font-semibold md:text-xl me-2">{product.Product_Name} </h1>
              {product.QTY == 0 && (
                <div className="bg-[#E42D12] p-1 text-white rounded-lg mb-2">
                  <p className="text-xs ">Out of Stock</p>
                </div>
              )}
              {product.QTY <= 5 && product.QTY > 0 && (
                <div className="bg-[#f1aa59] p-1 text-white rounded-3xl mb-2">
                  <p className="text-xs ">Limited Stock</p>
                </div>
              )}
            </div>


            <div className="flex items-center space-x-2">
              {product.Discount > 0 && (
                <span className="md:px-2 px-3 md:py-1 py-1 md:text-sm text-xs font-semibold text-white bg-secondary rounded-3xl">{product.Discount}% off</span>
              )}
              {product.Sale_Price > 0 && (
                <span className="text-base font-bold text-primary md:text-2xl">
                  ₹{((product.Sale_Price - (product.Sale_Price * product.Discount) / 100)).toFixed(2)}
                </span>
              )}
              {product.Discount > 0 && (
                <span className="text-xs text-third line-through md:text-base">₹{product?.Sale_Price?.toFixed(2)}</span>
              )}
            </div>

            <div className="flex items-center gap-5 sticky bg-white    py-2 md:py-2  lg:bottom-0 bottom-[60px]">
              {product.QTY > 0 && product.QTY !== null && (
                <>
                  {getCurrentCartQuantity() === 0 ? (
                    <button className="flex items-center justify-center gap-2 w-full md:p-5 p-2 px-6 md:text-base text-sm font-semibold text-white rounded-3xl   bg-primary transition-colors " onClick={() => handleAddToCart(product)}  >
                      <span> <i className="fi fi-ts-cart-minus text-white flex items-center justify-center"></i> </span>
                      Add to Cart
                    </button>
                  ) : (
                    <button className="flex items-center justify-center gap-2 w-full md:p-5 p-2 px-6 md:text-base text-sm font-semibold text-white rounded-3xl bg-primary transition-colors">
                      <span> <i className="fi fi-ts-cart-minus text-white flex items-center justify-center"></i> </span>
                      <span className="mx-2">{getCurrentCartQuantity()} in cart</span>
                    </button>
                  )}
                  {getCurrentCartQuantity() >= 1 ? (
                    <div className='flex flex-col justify-between md:gap-3 gap-1'>
                      <button className='bg-primary rounded-3xl border-primary border flex justify-center items-center cursor-pointer' onClick={handleIncreaseQuantity}>
                        <ChevronUpIcon className="md:w-6 md:h-6 w-4 h-4 text-white " />
                      </button>
                      <button className='bg-primary rounded-3xl  cursor-pointer disabled:cursor-not-allowed  disabled:bg-primary/80' disabled={getCurrentCartQuantity() <= 1} onClick={handleDecreaseQuantity}>
                        <ChevronDownIcon className="md:w-6 md:h-6 w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div>
                    </div>
                  )}
                </>
              )}

              {/* <button onClick={() => handleAddToWishlist(product)} className="px-3 pt-2 border rounded-3xl h-fit group-0">
              {wishlistData?.map(resp=>resp.productId._id).includes(product._id)?<i className="text-2xl text-red-500 transition-colors fi-sr-bookmark"></i>
                :<><i className="block text-2xl transition-colors fi-rr-bookmark text-black/60 group-1"></i>
                  <i className="hidden text-2xl text-red-500 transition-colors fi-sr-bookmark group-2"></i></>}
               </button> */}
              <button onClick={() => handleAddToWishlist(product)} className="px-3 pt-2   h-fit group-0">
                {wishlistData?.map(resp => resp.productId?._id).includes(product._id) ? (
                  <i className="text-2xl text-red-500 transition-colors fi-ss-heart"></i>
                ) : (
                  <i className="text-2xl transition-colors fi-bs-heart text-black/60 dark:text-white"></i>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">

              {/* <div className="relative inline-block" onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}    >
              <span className="text-green-600 cursor-pointer dark:text-green-200">Freshness Guarantee</span>
              {isTooltipVisible && (
                <div className="absolute z-10 p-3 mb-2 text-sm text-gray-700 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
                  <p>
                    We take pride in the quality and freshness of our products. If you&apos;re unsatisfied with your purchase, let us know. See{' '}
                    <Link to="/terms-and-conditions" className="text-blue-500 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    for more details.
                  </p>
                </div>
              )}
            </div> */}
              {/* <p className="text-sm text-gray-500 dark:text-white">Weekly sold 100+</p> */}
            </div>
            {product?.Product_Highlights &&
              <div>
                <h3 className="mt-4 text-lg font-semibold text-gray-500 dark:text-white">Product highlights</h3>
                <ul className="text-sm text-gray-500 list-disc list-inside dark:text-white md:text-base dark:bg-gray-700 dark:p-2 dark:rounded-lg">
                  {product?.Product_Highlights?.split('.').filter(highlight => highlight.trim() !== '').map((highlight, index) => (
                    <li key={index}>{highlight.trim()}</li>
                  ))}
                </ul>
              </div>}
            {/* description */}
            <div className=" space-y-4">
              <div className="  ">
                <div className="flex items-center justify-between cursor-pointer bg-gray-50 p-3" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                  <h2 className=" uppercase md:text-base">PRODUCT DESCRIPTION</h2>
                  <i
                    className={`fi fi-rs-angle-down text-[#269C52] ${isDescriptionOpen ? "rotate-180" : "rotate-0"
                      } duration-300`}
                  ></i>
                </div>
                <div ref={descriptionRef} className={`transition-all duration-300 overflow-hidden`}
                  style={{ height: isDescriptionOpen ? contentHeight : "0px", }}  >
                  <div className=" text-gray-700 dark:text-white p-2  md:text-base text-sm">
                    <p dangerouslySetInnerHTML={{ __html: product.Product_Description }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections for Similar Items, Reviews, and Bought Together */}
        {/* <section>
        <SimilerItem similarItems={similarItems} />
      </section> */}

        <section className="max-w-[100rem]">
          <section>

            <RegisterContinueGoogle visible={visible} setVisible={setVisible} />

          </section>
        </section>
      </div>
    </>
  );
};

export default ProductView;
