
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { products } from '../../../../assets/topdiscount/topDiscount';
// import { products1 } from '../../../../assets/megaoffers/megaOffer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import DealSwiper from '../../../../shared/Components/Home/DealSwiper';
import { MultiSelect } from 'primereact/multiselect';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

export default function Addandeditform(props) {
  const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate, categories, setCategories, subcategories, setSubcategories, products, } = props;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);


  const getFirstImage = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      return `${apiurl()}/${images[0]}`;
    }
    return '/placeholder.png';
  };

  const productTemplate = (option) => {
    if (!option) return null;

    return (
      <div className="flex items-center gap-3 p-2">
        <img
          src={getFirstImage(option.Images)}
          alt={option.Product_Name}
          className="object-cover w-12 h-12 rounded"
        />
        <div className="flex flex-col">
          <span className="font-medium">{option.Product_Name || 'Unnamed Product'}</span>
          <div className="flex gap-2 text-sm text-gray-600">
            <span>{option.Brand_Name}</span>
            <span>•</span>
            <span>${option.Sale_Price}</span>
          </div>
        </div>
      </div>
    );
  };

  const selectedProductTemplate = (option) => {
    const product = products.find(p => p._id === option);
    if (!product) return null;

    return (
      <div className="flex items-center gap-2">
        <img
          src={getFirstImage(product.Images)}
          alt={product.Product_Name}
          className="object-cover w-6 h-6 rounded"
        />
        <span>{product.Product_Name || 'Unnamed Product'}</span>
      </div>
    );
  };

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      prevRef.current.classList.add('custom-swiper-prev');
      nextRef.current.classList.add('custom-swiper-next');
    }
  }, []);

  return (
    <Dialog header={formdata?._id ? "Update Offers" : "Add Offers"} visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[75vw]" maximizable>
      <form onSubmit={formdata?._id ? handleupdate : handlesave}>

        <div>
          {!formdata?.Design || formdata?.Design == "Design_1" && <div className="w-full mb-3 rounded-3xl">
            {/* top design */}
            <div className='relative flex items-end justify-center w-10/12 mx-auto lg:w-3/4 xl:w-1/2'>
              <svg className='w-full translate-y-2' viewBox="0 0 845 183" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M121.5 137C56.3 127.4 13.3333 163.333 0 182.5H845C829.4 141.3 764.5 135 734 137C706.4 68.1998 623.833 71.9994 586 82.4993C508 82.4993 454.167 27.4998 437 0C377.8 78 307.333 87.4995 279.5 82.4993C187.9 55.6993 136 107.666 121.5 137Z" fill={formdata.BGColor ? formdata.BGColor : "#540045"} />
              </svg>
              <h1 className={`absolute xsm:text-xl translate-y-3 sm:translate-y-0 sm:text-4xl xl:text-4xl 3xl:text-6xl font-agbalumo text-center `} style={{ color: formdata.titlecolor ? formdata.titlecolor : '#ffff' }}>
                {formdata.Title ? formdata.Title : 'Add Title'}
              </h1>
              {!formdata?.Border || formdata?.Border == "Border_1" && <>
                <img src="/assets/megaoffers/flower.png" alt="" className='absolute w-12 -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 lg:w-24' />
                <img src="/assets/megaoffers/flower.png" alt="" className='absolute w-12 -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 lg:w-24' />
              </>}
              {formdata?.Border == "Border_2" && <>
                <img src="/assets/topdiscount/rangoli 64.png" alt="" className='absolute w-12 -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 lg:w-24' />
                <img src="/assets/topdiscount/rangoli 64.png" alt="" className='absolute w-12 -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 lg:w-24' />
              </>}
            </div>

            {/* inner content*/}
            <div className={`w-full rounded-3xl bg-contain`} style={{ backgroundColor: formdata.BGColor ? formdata.BGColor : '#540045' }}>
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
                    {formdata.Products && formdata.Products.length > 0 ? (
                      formdata.Products.map((productId) => {
                        const product = products.find((p) => p._id === productId);
                        if (!product) return null;

                        return (
                          <SwiperSlide key={product._id}>
                            <div
                              className="relative p-3 overflow-hidden bg-white cursor-pointer rounded-2xl lg:min-h-48 group"
                              style={{
                                borderColor: formdata?.CardBorderColor || "transparent",
                                borderWidth: "2px",
                                borderStyle: "solid",
                                backgroundColor: formdata?.CardBackgroundColor || "#FFFFFF",
                              }}
                            >
                              {/* Decorative Line and Before Animation */}
                              <div className="absolute -top-3 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-[#de1f25] to-transparent before:animate-pulse"></div>
                              <div className="absolute -bottom-3 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-[#de1f25] to-transparent before:animate-pulse"></div>

                              {/* Product Image */}
                              <div className="h-[120px] flex justify-center items-center p-2 overflow-hidden rounded-lg"
                                style={{
                                  borderColor: formdata?.CardImageBorderColor || "transparent",
                                  borderWidth: "2px",
                                  borderStyle: "solid",
                                }}
                              >
                                <img src={getFirstImage(product.Images)} alt={product.Product_Name}
                                  className="object-cover w-auto h-full duration-300 scale-95 group-hover:scale-105"
                                />
                              </div>

                              {/* Product Name */}
                              <p className="pt-1 text-xs sm:text-sm lg:pl-2 whitespace-nowrap" style={{ color: formdata?.CardTextColor || "#000000", }}>
                                {product.Product_Name}
                              </p>

                              {/* Discount Text */}
                              <p
                                className="pl-1 font-semibold duration-100 border-l-4 lg:border-l-0 lg:group-hover:border-l-4 whitespace-nowrap"
                                style={{
                                  color: formdata?.DiscountTextColor || "#FF0000",
                                  borderColor: formdata?.DiscountBorderColor || "#de1f25",
                                }}
                              >
                                UP TO {product.Discount || 0}% OFF
                              </p>
                            </div>
                          </SwiperSlide>


                        );
                      })
                    ) : (
                      <p className="text-center text-gray-500">No products selected</p>
                    )}
                  </Swiper>

                </div>

                {/* Navigation Buttons */}
                <div
                  ref={prevRef}
                  className={`${atStart ? 'hidden' : 'inline-block'
                    } z-10 rounded-r-full pr-3 py-5 absolute top-1/2 left-0 transform -translate-y-1/2`}
                  style={{ backgroundColor: formdata.BGColor ? formdata.BGColor : '#540045' }}
                >
                  <img
                    src="/assets/megaoffers/swiperbtn.svg"
                    alt="Previous"
                    className="w-3 ml-5 rotate-180 cursor-pointer xsm:w-auto"
                  />
                </div>
                <div
                  ref={nextRef}
                  className={`${atEnd ? 'hidden' : 'inline-block'
                    } z-10 rounded-l-full pl-3 py-5 absolute top-1/2 right-0 transform -translate-y-1/2`}
                  style={{ backgroundColor: formdata.BGColor ? formdata.BGColor : '#540045' }}
                >
                  <img
                    src="/assets/megaoffers/swiperbtn.svg"
                    alt="Next"
                    className="w-3 mr-5 cursor-pointer xsm:w-auto"
                  />
                </div>
              </div>
            </div>

          </div>}
          {!formdata?.Design || formdata?.Design === "Design_2" && (
            <div className="w-full p-5 mx-auto">
              {/* Top Design */}
              <div className="relative flex items-end justify-center w-10/12 mx-auto lg:w-3/4 xl:w-1/2">
                <svg
                  className="w-full translate-y-0.5"
                  viewBox="0 0 845 183"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M121.5 137C56.3 127.4 13.3333 163.333 0 182.5H845C829.4 141.3 764.5 135 734 137C706.4 68.1998 623.833 71.9994 586 82.4993C508 82.4993 454.167 27.4998 437 0C377.8 78 307.333 87.4995 279.5 82.4993C187.9 55.6993 136 107.666 121.5 137Z"
                    fill={formdata?.titleBgcolor || "#f0c135"}
                  />
                </svg>
                <h1
                  className={`absolute xsm:text-xl sm:-translate-y-3 sm:text-4xl xl:text-4xl 3xl:text-6xl font-agbalumo text-center`}
                  style={{ color: formdata?.titlecolor || "#994d00" }}
                >
                  {formdata?.Title || "Add Title"}
                </h1>
                {!formdata?.Border || formdata?.Border == "Border_1" && <>
                  <img src="/assets/megaoffers/flower.png" alt="" className='absolute w-12 -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 lg:w-24' />
                  <img src="/assets/megaoffers/flower.png" alt="" className='absolute w-12 -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 lg:w-24' />
                </>}
                {formdata?.Border == "Border_2" && <>
                  <img src="/assets/topdiscount/rangoli 64.png" alt="" className='absolute w-12 -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 lg:w-24' />
                  <img src="/assets/topdiscount/rangoli 64.png" alt="" className='absolute w-12 -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 lg:w-24' />
                </>}
              </div>

              {/* Inner Content */}
              <div
                className="w-full p-1 bg-gradient-to-b rounded-2xl"
                style={{
                  background: `linear-gradient(to bottom, ${formdata?.BorderColor1 || "#b58d14"
                    }, ${formdata?.BorderColor2 || "#f5d164"})`,
                }}
              >
                <div className="w-full grid xsm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-[2vw] 3xl:gap-9 p-5 lg:p-14 bg-white rounded-xl">
                  {formdata.Products && formdata.Products.length > 0 ? (
                    formdata.Products.map((productId) => {
                      const product = products.find((p) => p._id === productId);
                      if (!product) return null;

                      return (
                        <div
                          key={product._id}
                          className="max-w-[200px] mx-auto p-0.5 rounded-t-full group hover:shadow-lg duration-300"
                          style={{
                            background: `linear-gradient(to bottom, ${formdata?.CardOverlayColor1 || "#a87f03"
                              }, ${formdata?.CardOverlayColor2 || "#fad66b"})`,
                            borderWidth: "2px",
                            borderStyle: "solid",
                          }}
                        >
                          <div
                            className="flex items-center justify-center w-full h-40 overflow-hidden rounded-t-full max-h-40 md:max-h-60 md:h-60 md:py-5"
                            style={{
                              background: `linear-gradient(to bottom, ${formdata?.ImageBackgroundColor1 || "#fffffc"}, ${formdata?.ImageBackgroundColor2 || "#fff1b5"})`,
                            }}
                          >
                            <img
                              src={getFirstImage(product.Images)}
                              alt={product.Product_Name}
                              className="duration-300 h-28 md:h-auto lg:scale-95 lg:group-hover:scale-105 lg:group-hover:translate-y-2 lg:group-hover:drop-shadow-xl"
                            />
                          </div>

                          <div
                            className="text-center sm:p-2 md:whitespace-nowrap"
                            style={{
                              backgroundColor: formdata?.DiscountBgColor || "#ed135c",
                            }}
                          >
                            <p
                              className="font-semibold whitespace-nowrap"
                              style={{
                                color: formdata?.CardTextColor || "#FFFFFF",
                              }}
                            >
                              {product.Product_Name}
                            </p>
                            <p
                              className="text-sm font-bold sm:text-base md:text-xl whitespace-nowrap"
                              style={{
                                color: formdata?.DiscountTextColor || "#ffe357",
                              }}
                            >
                              UP TO {product.Discount || 0}% OFF
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500">No products selected</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!formdata?.Design || formdata?.Design === "Design_3" && (
            <section className="max-w-[85rem] mx-auto px-5">
              {/* Top Design */}
              <div className="relative flex items-center justify-center">
                <div>
                  <div className="relative">
                    <svg
                      className="w-full h-auto mx-auto"
                      width="845"
                      height="183"
                      viewBox="0 0 845 183"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M121.5 137C56.3 127.4 13.3333 163.333 0 182.5H845C829.4 141.3 764.5 135 734 137C706.4 68.1998 623.833 71.9994 586 82.4993C508 82.4993 454.167 27.4998 437 0C377.8 78 307.333 87.4995 279.5 82.4993C187.9 55.6993 136 107.666 121.5 137Z"
                        fill={formdata?.TitleBgColor ? formdata?.TitleBgColor : "#007369"}
                      />
                    </svg>
                    {!formdata?.Border || formdata?.Border === "Border_1" && (
                      <>
                        <img
                          src="/assets/megaoffers/flower.png"
                          alt=""
                          className="absolute z-10 lg:w-20 w-14 -bottom-7 -left-5"
                        />
                        <img
                          src="/assets/megaoffers/flower.png"
                          alt=""
                          className="absolute z-10 lg:w-20 w-14 -bottom-7 -right-5"
                        />
                      </>
                    )}
                    {formdata?.Border === "Border_2" && (
                      <>
                        <img
                          src="/assets/topdiscount/rangoli 64.png"
                          alt=""
                          className="absolute z-10 lg:w-20 w-14 -bottom-7 -left-5"
                        />
                        <img
                          src="/assets/topdiscount/rangoli 64.png"
                          alt=""
                          className="absolute z-10 lg:w-20 w-14 -bottom-7 -right-5"
                        />
                      </>
                    )}
                  </div>
                </div>
                <h1
                  className="absolute text-base font-bold text-white top-1/2 lg:text-5xl md:text-2xl agbalumo-regular"
                  style={{ color: formdata?.TitleColor ? formdata?.TitleColor : "#FFFFFF" }}
                >
                  {formdata?.Title ? formdata?.Title : "Add Title"}
                </h1>
              </div>

              {/* Inner Content */}
              <div>
                <div className="mx-auto swiper-container-wrapper">
                  <div
                    className="bg-[#DCFFFC] rounded-3xl pt-10 pb-5 px-7 group/main relative overflow-hidden"
                    style={{
                      background: `linear-gradient(to bottom, ${formdata?.BGColor1 || "#DCFFFC"}, ${formdata?.BGColor2 || "#FFFFFF"})`,
                    }}
                  >
                    <Swiper
                      loop={true}
                      speed={1000}
                      spaceBetween={10}
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        460: { slidesPerView: 2 },
                        1120: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1500: { slidesPerView: 5 },
                      }}
                      navigation={{
                        nextEl: ".swiper-button-nextdeal",
                        prevEl: ".swiper-button-prevdeal",
                      }}
                      modules={[Navigation, Autoplay]}
                    >
                      {formdata.Products && formdata.Products.length > 0 ? (
                        formdata.Products.map((productId) => {
                          const product = products.find((p) => p._id === productId);
                          if (!product) return null;

                          return (
                            <SwiperSlide key={product._id}>
                              <div className="relative px-2 pb-5 group">
                                <div
                                  className="relative w-full pt-4 shadow-md cursor-pointer border-3 rounded-3xl"
                                  style={{
                                    backgroundColor: formdata?.CardColor ? formdata?.CardColor : "#FFFFFF",
                                    borderColor: formdata?.CardBorderColor || "#007369",
                                  }}
                                >
                                  <div className="flex items-center justify-center">
                                    <img
                                      src={getFirstImage(product.Images)}
                                      alt={product.Product_Name}
                                      style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                      }}
                                      className="duration-300 group-hover:scale-105"
                                    />
                                  </div>
                                  <div
                                    className="absolute p-1 text-sm font-bold rounded-lg top-2 right-3"
                                    style={{
                                      backgroundColor: formdata?.ButtonBGColor || "#D90028",
                                      color: formdata?.ButtonTextColor || "#FFFFFF",
                                    }}
                                  >
                                    {product.Discount || 0}%
                                  </div>
                                  {/* Add Button */}
                                  <div
                                    className="absolute flex items-center justify-center -bottom-4 -right-4 z-10 w-8 h-8 rounded-full bg-[#269C52] cursor-pointer hover:scale-110"
                                    onClick={() => {
                                      toast.success(`${product.Product_Name} Added To Cart Successfully`);
                                    }}
                                  >
                                    <i className="text-lg text-white fi fi-rr-plus"></i>
                                  </div>
                                  <div style={{
                                    backgroundColor: formdata?.TextBgColor || "#007369",
                                  }} className="h-24 p-2 mt-3 text-center text-white rounded-2xl">
                                    <h2
                                      className="mt-3 text-sm md:text-base"
                                      style={{
                                        color: formdata?.TextColor || "#FFFFFF",
                                      }}
                                    >
                                      {product.Product_Name}
                                    </h2>
                                    <h3
                                      className="text-sm font-semibold"
                                      style={{
                                        color: formdata?.PriceColor || "#FFFFFF",
                                      }}
                                    >
                                      ${product.Sale_Price || "N/A"}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })
                      ) : (
                        <p className="text-center text-gray-500">No products selected</p>
                      )}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <div className="absolute left-0 duration-300 -translate-x-full -translate-y-1/2 opacity-0 top-1/2 group-hover/main:translate-x-0 group-hover/main:opacity-100">
                      <img
                        className="px-2 swiper-button-prevdeal"
                        src="/images/Design/Vector 16.png"
                        alt=""
                      />
                    </div>
                    <div className="absolute right-0 duration-300 translate-x-full -translate-y-1/2 opacity-0 top-1/2 group-hover/main:translate-x-0 group-hover/main:opacity-100">
                      <img
                        className="px-2 swiper-button-nextdeal"
                        src="/images/Design/Vector 15.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>


          )}
        </div>
        <div className="">
          <div className="grid items-end grid-cols-1 gap-2 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-white">
                Select Design<span className="text-red-500">*</span>
              </label>
              <select
                name="Design"
                value={formdata?.Design}
                onChange={handlechange}
                className="w-full px-4 py-2 border rounded-md outline-none"
              >
                <option value="">Select Design</option>
                <option value="Design_1">Design 1</option>
                <option value="Design_2">Design 2</option>
                <option value="Design_3">Design 3</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-white">
                Select Border Icon<span className="text-red-500">*</span>
              </label>
              <select
                name="Border"
                value={formdata?.Border}
                onChange={handlechange}
                className="w-full px-4 py-2 border rounded-md outline-none"
              >
                <option value="">Select Border</option>
                <option value="Border_1">Border 1</option>
                <option value="Border_2">Border 2</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-white">
                Offer Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Title"
                value={formdata?.Title}
                onChange={handlechange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-white">
                Choice Product By<span className="text-red-500">*</span>
              </label>
              <select
                name="Choice_Product_By"
                value={formdata?.Choice_Product_By}
                onChange={handlechange}
                className="w-full px-4 py-2 border rounded-md outline-none"
              >
                <option value="">Select</option>
                <option value="Category">Category</option>
                <option value="Tag">Tag</option>
              </select>
            </div>

            {formdata?.Choice_Product_By === "Category" && (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Category<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="Category"
                    value={formdata?.Category || ""}
                    onChange={handlechange}
                    className="w-full px-4 py-2 border rounded-md outline-none"
                  >
                    <option value="">Select</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {formdata?.Category && (
                  <div>
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                      Sub Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="Sub_Category"
                      value={formdata?.Sub_Category || ""}
                      onChange={handlechange}
                      className="w-full px-4 py-2 border rounded-md outline-none"
                    >
                      <option value="">Select</option>
                      {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formdata?.Category && formdata?.Sub_Category && (
                  <div>
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                      Products<span className="text-red-500">*</span>
                    </label>
                    <MultiSelect
                      value={formdata?.Products || []}
                      options={products.filter(
                        (product) =>
                          product.Category === formdata.Category &&
                          product.Sub_Category === formdata.Sub_Category
                      )}
                      onChange={(e) =>
                        handlechange({
                          target: {
                            name: "Products",
                            value: e.value,
                          },
                        })
                      }
                      optionLabel="Product_Name"
                      optionValue="_id"
                      placeholder="Select Products"
                      filter
                      selectedItemTemplate={selectedProductTemplate}
                      itemTemplate={productTemplate}
                      className="w-full"
                      panelClassName="border border-gray-200 rounded-md shadow-lg"
                      maxSelectedLabels={3}
                      display="chip"
                    />
                  </div>
                )}
              </>
            )}


            {formdata?.Choice_Product_By === "Tag" && (
              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Tag <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Address"
                  value={formdata?.Address}
                  onChange={handlechange}
                  className="w-full px-4 py-2 border rounded-md outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium dark:text-white">
                Status<span className="text-red-500">*</span>
              </label>
              <select
                name="Status"
                value={formdata?.Status}
                onChange={handlechange}
                className="w-full px-4 py-2 border rounded-md outline-none"
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>
            {/* Separate Color Fields for Each Design */}
            {formdata?.Design === "Design_1" && (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Title Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="titlecolor"
                    value={formdata?.titlecolor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                   {/*Background Color */}
                   <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Background Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="BGColor"
                    value={formdata?.BGColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                {/* Card Background Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Background Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardBackgroundColor"
                    value={formdata?.CardBackgroundColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Card Border Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Border Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardBorderColor"
                    value={formdata?.CardBorderColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Card Image Border Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Image Border Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardImageBorderColor"
                    value={formdata?.CardImageBorderColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Product Name Text Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Product Name Text Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardTextColor"
                    value={formdata?.CardTextColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Discount Text Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Discount Text Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="DiscountTextColor"
                    value={formdata?.DiscountTextColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
              </>
            )}



            {formdata?.Design === "Design_2" && (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Title color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="titlecolor"
                    value={formdata?.titlecolor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Title Bgcolor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="titleBgcolor"
                    value={formdata?.titleBgcolor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                {/* Gradient Border Colors */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Border Gradient Color 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="BorderColor1"
                    value={formdata?.BorderColor1}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Border Gradient Color 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="BorderColor2"
                    value={formdata?.BorderColor2}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Gradient Color 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="ImageBackgroundColor1"
                    value={formdata?.ImageBackgroundColor1 || "#fffffc"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Gradient Color 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="ImageBackgroundColor2"
                    value={formdata?.ImageBackgroundColor2 || "#fff1b5"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>


                {/* Product Name Text Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Product Name Text Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardTextColor"
                    value={formdata?.CardTextColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Discount Text Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Discount Text Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="DiscountTextColor"
                    value={formdata?.DiscountTextColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                {/* Discount Background Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Discount Bg Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="DiscountBgColor"
                    value={formdata?.DiscountBgColor}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Card Gradient Overlay */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Gradient Overlay Color 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardOverlayColor1"
                    value={formdata?.CardOverlayColor1}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Gradient Overlay Color 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardOverlayColor2"
                    value={formdata?.CardOverlayColor2}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
              </>
            )}


            {formdata?.Design === "Design_3" && (
              <>
                {/* Title Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Title Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="TitleColor"
                    value={formdata?.TitleColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Title BgColor */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Title BgColor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="TitleBgColor"
                    value={formdata?.TitleBgColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Card text Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Text Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="TextColor"
                    value={formdata?.TextColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Card Price Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Price Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="PriceColor"
                    value={formdata?.PriceColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Text Background Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Text Background Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="TextBgColor"
                    value={formdata?.TextBgColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />

                </div>
                {/* Card Background Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Background Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardColor"
                    value={formdata?.CardColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Card border Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Card Border Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="CardBorderColor"
                    value={formdata?.CardBorderColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Background Gradient Colors */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Background Gradient Color 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="BGColor1"
                    value={formdata?.BGColor1 || "#007369"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Background Gradient Color 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="BGColor2"
                    value={formdata?.BGColor2 || "#DCFFFC"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Button Background Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Button Background Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="ButtonBGColor"
                    value={formdata?.ButtonBGColor || "#269C52"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>

                {/* Button Text Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">
                    Button Text Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="ButtonTextColor"
                    value={formdata?.ButtonTextColor || "#FFFFFF"}
                    onChange={handlechange}
                    className="w-full h-10 border rounded-md outline-none"
                    required
                  />
                </div>
              </>
            )}

          </div>
        </div>



        {/* <FormFields 
  formdata={formdata}
  handlechange={handlechange}
  categories={categories}
  subcategories={subcategories}
  products={products}
  selectedProductTemplate={selectedProductTemplate}
  productTemplate={productTemplate}
/> */}

        <div className="mt-2 text-center">
          <button type="submit" className="px-4 py-2 text-white bg-green-400 border rounded-md " >
            {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} {formdata?._id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Dialog>
  )
}
