import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SimilerItem from './SimilerItem';
// import Reviews from './Reviews';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { Link } from 'react-router-dom';
import RegisterContinueGoogle from '../Register-ContiGoogle/RegisterContiGoogle';

const ProductView = (props) => {

  const { product, mainImage, setMainImage, mainImageRef, zoomStyle, handleMouseMove, handleMouseLeave, getCurrentCartQuantity, handleAddToCart, handleDelete, handleDecreaseQuantity, 
    handleIncreaseQuantity, handleAddToWishlist, wishlistData, setIsTooltipVisible, isTooltipVisible, setIsDescriptionOpen, isDescriptionOpen, descriptionRef, similarItems,
    visible, setVisible
  } = props 

  return (
    <div className='dark:bg-black'>
      <div className="grid xl:grid-cols-8 grid-cols-6 gap-10  md:space-x-8 xl:my-20 md:mt-10 mb-10 px-3 max-w-[120rem] ">
        <div className="flex flex-row items-center order-2 col-span-6 gap-2 overflow-x-auto overflow-y-hidden md:flex-col md:space-y-3 md:order-1 scrollbar-hide md:col-span-1 place-items-center">
          {product.Images.map((img, index) => (
            <img key={index} src={`${apiurl()}/${img}`} alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 border ${mainImage === img ? 'border-orange-500' : 'border-gray-300 bg-[#FFF6F4]'} rounded cursor-pointer p-2`}
              onClick={() => setMainImage(img)}
              onMouseEnter={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className="flex-1 order-1 col-span-6 mx-auto overflow-hidden rounded-lg xl:col-span-4 lg:col-span-3 md:col-span-3 md:order-2 place-items-center "   >
          <div className="relative" ref={mainImageRef} style={zoomStyle} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
            <img src={`${apiurl()}/${mainImage}`} alt="Main product" className="object-contain max-h-96 min-h-96 w-96" />
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
        <div className="order-3 col-span-6 mt-5 space-y-4 xl:col-span-2 md:col-span-3 md:order-3 xl:mt-0">
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
          <div className='flex flex-wrap items-end justify-start'>
            <h1 className="font-semibold md:text-2xl me-2">{product.Product_Name} </h1>
            {product.QTY == 0 ||product.QTY < 0 && (
              <div className="bg-[#E42D12] p-1 text-white rounded-lg mb-2">
                <p className="text-xs ">Out of Stock</p>
              </div>
            )} 
            {product.QTY <= 5 &&product.QTY > 0 && (
              <div className="bg-[#f1aa59] p-1 text-white rounded-lg mb-2">
                <p className="text-xs ">Limited Stock</p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {product.Brand_Name && (
              <p className="inline-block px-4 py-2 text-sm font-semibold text-black bg-green-500 rounded-xl bg-opacity-20 dark:bg-green-300">{product.Brand_Name}</p>
            )}
            {product.Measurement_Units && product.Unit_of_Measurements && (
              <span className="text-lg font-medium text-gray-600 dark:text-white">{product.Measurement_Units} per {product.Unit_of_Measurements}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
           {product.Discount > 0 && (
              <span className="md:px-2 px-3 md:py-1 text-sm font-semibold text-white bg-[#F29D36] rounded-3xl">{product.Discount}% off</span>
            )}
           {product.Sale_Price > 0 && (
            <span className="text-base font-bold text-orange-600 md:text-2xl">
              ₹{((product.Sale_Price - (product.Sale_Price * product.Discount) / 100)).toFixed(2)}
            </span>
          )}
          {product.Discount > 0 && (
              <span className="text-sm text-gray-400 line-through md:text-base">₹{product?.Sale_Price?.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-5">
          {product.QTY > 0 && product.QTY !== null && (
            <>
            {getCurrentCartQuantity() === 0 ? (
              <button
                className="flex items-center justify-center gap-2 w-full p-3 md:text-base text-sm font-semibold text-white bg-secondary hover:bg-[#ffc445] transition-colors rounded-full"
                onClick={() => handleAddToCart(product)}
              >
                <span>
                  <img src="/images/Product-View/Shopping Cart.png" alt="Cart icon" />
                </span>
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between w-full py-[13.4px] px-[3.3px] font-semibold text-white bg-[#CA2E43] rounded-full">
                <button
                  onClick={getCurrentCartQuantity() === 1 ? handleDelete : handleDecreaseQuantity}
                  className="flex items-center justify-center w-10 text-white rounded-3xl"
                >
                  {getCurrentCartQuantity() === 1 ? (
                    <i className="fi fi-rr-trash relative top-[3px] text-white text-sm"></i>
                  ) : (
                    <span>-</span>
                  )}
                </button>
                <span className="mx-2">{getCurrentCartQuantity()} in cart</span>
                <button onClick={handleIncreaseQuantity} className="px-3 text-white rounded-3xl">+</button>
              </div>
            )}
            </>
          )}
            {/* <button onClick={() => handleAddToWishlist(product)} className="px-3 pt-2 border rounded-3xl h-fit group-0">
              {wishlistData?.map(resp=>resp.productId._id).includes(product._id)?<i className="text-2xl text-red-500 transition-colors fi-sr-bookmark"></i>
                :<><i className="block text-2xl transition-colors fi-rr-bookmark text-black/60 group-1"></i>
                  <i className="hidden text-2xl text-red-500 transition-colors fi-sr-bookmark group-2"></i></>}
            </button> */}
            <button  onClick={() => handleAddToWishlist(product)}  className="px-3 pt-2 border rounded-3xl h-fit group-0">
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
            <p className="text-sm text-gray-500 dark:text-white">Weekly sold 100+</p>
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
            <div className="p-2 border rounded-md shadow-md">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                <h2 className="font-semibold">Description</h2>
                  <i className={`fi fi-rs-angle-down text-[#269C52] ${isDescriptionOpen ? 'rotate-180':'rotate-0' } duration-300 `}></i>
              </div>
              <div ref={descriptionRef} className={`transition-height ${isDescriptionOpen ? 'h-auto' : 'h-0'}`}
                style={{ height: isDescriptionOpen ? `${descriptionRef.current.scrollHeight}px` : '0px' }}
              >
                <div className="mt-2 text-gray-700 dark:text-white">
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
  );
};

export default ProductView;
