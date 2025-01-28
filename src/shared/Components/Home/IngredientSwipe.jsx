import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { apigetallingredients } from "../../services/apiIngredients/apiingredients";
import apiurl from "../../services/apiendpoint/apiendpoint";

const IngredientSwipe = ({ title, visible, setVisible, AddtoCartProduct }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apigetallingredients();
        setIngredients(data.response || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        // toast.error("Failed to load ingredients");
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (ingredient) => {
    setSelectedProduct(ingredient);
    setVisible(true);
  };

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder-image.png";
    e.target.onerror = null;
  };

  const footerContent = (
    <div>
      <button onClick={() => setVisible(false)} className="p-2 mx-5 mt-5 text-white bg-red-500 rounded hover:bg-red-600">
        Cancel
      </button>
      <button onClick={() => {
        setVisible(false);
         AddtoCartProduct(selectedProduct);
      }}
        className="inline-flex gap-2 p-2 px-3 text-white bg-green-500 rounded hover:bg-green-600" >
        <i className="fi fi-sr-cart-shopping-fast"></i>Add to Cart
      </button>
    </div>
  );

  const headerContent = (
    <div className="flex items-center justify-start gap-2">
      {selectedProduct?.Image && (
        <img className="object-cover w-10 h-10 rounded" src={`${apiurl()}/${selectedProduct.Image}`} alt={selectedProduct.IngredientName} onError={handleImageError} />
      )}
      <div className="font-semibold">
        {selectedProduct ? selectedProduct.IngredientName : "Product Details"}
      </div>
    </div>
  );

  return (
    <section className="px-5 ">
      <div className="flex items-center justify-between pt-3 lg:py-5">
        <div className="flex items-center">
          <div className="z-10 rounded-full">
            <img className="w-12 md:w-20" src="/images/Design/Dd.png" alt="" />
          </div>
          <div className="flex items-center bg-[#38031D] dark:bg-zinc-200 relative right-8 text-[#EFA61B] w-fit h-fit md:text-xl text-base md:p-2 p-1 rounded-full">
            <span className="px-3 ml-5 text-sm md:text-base dark:text-black">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 mb-3 text-gray-400">
          <div ref={prevRef} className="duration-200 swipe-prevv active:-translate-x-1">
            <i className="fi fi-rr-angle-circle-left text-[30px] text-[#38031d] cursor-pointer"></i>
          </div>
          <div ref={nextRef} className="duration-200 swipe-nexxt active:translate-x-1">
            <i className="fi fi-rr-angle-circle-right text-[30px] text-[#38031d] cursor-pointer"></i>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto swiper-container-wrapper">
        <div className="mx-1 swiper-container">
          <Swiper speed={500} breakpoints={{ 320: { slidesPerView: 2 }, 460: { slidesPerView: 2 }, 768: { slidesPerView: 3, spaceBetween: 10 },
           1024: { slidesPerView: 4, spaceBetween: 10 }, 1500: { slidesPerView: 6, spaceBetween: 30 }, }} navigation={{ nextEl: ".swipe-nexxt", prevEl: ".swipe-prevv" }} modules={[Navigation, Autoplay]} >
            {ingredients.map((ingredient, index) => (
              <SwiperSlide key={ingredient._id || index}>
                <div className="relative m-2 duration-300 group">
                  <div className="w-full bg-cover p-4 min-h-[160px]   bg-white shadow shadow-[#edb94a] border rounded-lg relative overflow-hidden">
                    <img src="images/Indian-Cuisine/flower.png" className="absolute left-0 -top-1" alt="" />
                    <div className="flex items-center justify-center py-3 2xl:py-5">
                      <img onClick={() => handleProductClick(ingredient)} src={`${apiurl()}/${ingredient.Image}`} alt={ingredient.IngredientName} className="object-cover w-40 rounded-full cursor-pointer h-28 md:h-40" />
                    </div>

                    <div role="button" onClick={() => AddtoCartProduct(ingredient)} className="group/it absolute top-0 right-0 m-2 p-1 flex justify-center items-center border-[1.5px] rounded-full border-[#259c51] bg-white group-hover:bg-primary overflow-hidden shadow-md duration-300" >
                      <i className="fi fi-rr-plus-small text-2xl h-[25px] max-w-10 w-full text-primary group-hover:text-white"></i>
                    </div>
                    <div onClick={() => handleProductClick(ingredient)} className="p-1 text-center cursor-pointer bg-gradient-to-br from-[#db8114] via-[#edb94a] to-[#db8114] rounded-md" >
                      <h2 className="text-xs font-bold text-center text-black card-description md:text-lg whitespace-nowrap">{ingredient.IngredientName}</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <hr className="mt-5" />
      </div>

      <Dialog header={headerContent} visible={visible} style={{ width: "75vw" }} className="dialog-dark" breakpoints={{ "640px": "90vw" }} onHide={() => setVisible(false)} 
        footer={footerContent} pt={{
          root: { className: 'dark:bg-gray-600' },
          content: { className: 'dark:bg-gray-600' },
          header: { className: 'dark:bg-gray-600 dark:text-white' },
          footer: { className: 'dark:bg-gray-600 dark:text-white' }

        }}  >
        <div className="grid grid-cols-1 gap-4 xsm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
          {selectedProduct?.Products?.map((product, index) => (
            <div key={product._id || index} className="relative p-4 transition-shadow duration-300 rounded-lg group hover:shadow-lg" >
              <img className="absolute w-24 opacity-50 -z-10 -top-0 -left-0 group-hover:animate-wiggle" src="/images/Design/rangoli 16.png" alt="" onError={handleImageError} />
              <div className="w-full bg-white p-4 min-h-[160px] flex justify-center items-center shadow-md border rounded-lg relative cursor-pointer">
                <img src={`${apiurl()}/${product.Images[0]}`} alt={product.Product_Name} className="object-contain h-full max-h-40" onError={handleImageError} />
              </div>
              <div className="pl-1 mt-3">
                <h2 className="text-sm font-medium text-black md:text-base dark:text-white">{product.Product_Name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-sm line-through text-black/60 sm:text-base dark:text-white"> ${product.Regular_Price} </p>
                  <h3 className="font-semibold text-black md:text-lg dark:text-white"> ${product.Sale_Price} </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </section>
  );
};

export default IngredientSwipe;