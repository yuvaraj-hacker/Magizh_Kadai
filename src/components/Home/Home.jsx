
import { useEffect, useMemo, useState } from 'react'
import HeroSection from '../../shared/Components/Home/HeroSection'
import MegaOffers from '../../shared/Components/Home/MegaOffers'
import { NewArrivals } from '../../shared/Components/Home/NewArrivals.jsx'
import DailyDeals from '../../shared/Components/Home/DailyDeals'
import Testimoni from '../../shared/Components/Home/Testimoni'
import IngredientSwipe from '../../shared/Components/Home/IngredientSwipe'
import AllProducts from '../../shared/Components/Home/AllProducts.jsx'
import { getallbanners } from '../../admin/shared/services/apibanners/apibanners.js'
import { getalloffers } from '../../admin/shared/services/apioffers/apioffer.js'
import apiurl from '../../shared/services/apiendpoint/apiendpoint.js'
import toast from "react-hot-toast";
import useCart from '../../shared/services/store/useCart.js'
import { savecartitems, updatecartItem } from '../../shared/services/cart/cart.js'
import useAuth from '../../shared/services/store/useAuth.js'
import { mainCarouselBanners1, categoryDealsBanners1 } from '../../shared/services/json/heroSection.js'
import { getallproducts, getallProductsByCategory } from '../../shared/services/apiproducts/apiproduct.js'
import SwiperMin from '../../shared/Components/Home/SwiperMin.jsx'
import { useCallback } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Helmet } from 'react-helmet'
import Products from '../Products/Products.jsx'
import HomrProducts from './HomrProducts.jsx'

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [rows, setRows] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Product, setProduct] = useState(null);
  const [mainCarouselBanners, setMainCarouselBanners] = useState([]);
  const [categoryDealsBanners, setCategoryDealsBanners] = useState([]);
  const [categoryProducts, setCategoriesProducts] = useState();
  const { addToCart, cartItems, increaseQuantity, } = useCart();
  const { userdetails } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch banners
  //       const bannerResponse = await getallbanners();
  //       const banners = bannerResponse.resdata || [];
  //       const mainCarousel = banners.find((b) => b.banner_type === "Main Carousel");
  //       const categoryDeals = banners.find((b) => b.banner_type === "Category Deals");
  //       if (mainCarousel) setMainCarouselBanners(mainCarousel.Images);
  //       if (categoryDeals) setCategoryDealsBanners(categoryDeals.Images);

  //       // Fetch offers
  //       const offerResponse = await getalloffers();
  //       const activeOffers = offerResponse.resdata.filter(
  //         (offer) => offer.Status === "Active"
  //       );
  //       setOffers(activeOffers);


  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const productfetch = useCallback(async () => {
  //   const productResponse = await getallProductsByCategory();
  //   setProduct(productResponse);
  // }, []);
  // useEffect(() => {
  //   productfetch();
  // }, [productfetch]);
  // const groupedProducts = useMemo(() => {
  //   return Product?.reduce((acc, product) => {
  //     if (!acc[product.Category]) {
  //       acc[product.Category] = [];a
  //     }
  //     acc[product.Category].push(product);
  //     return acc;
  //   }, {});
  // }, [Product]);



  const handleProductClick = (prod) => {
    setSelectedProduct(prod);
    setVisible(true);
  };
  const AddtoCartProduct = async (prods) => {
    try {
      const cartItemsFromStore = cartItems || [];

      for (const prod of prods?.Products) {
        const existingCartItem = cartItemsFromStore.find(item => item._id === prod.Products_id);
        const isFreshProduce = prod.Category === "Fresh Produce";
        const increment = isFreshProduce ? 0.5 : 1;

        if (existingCartItem) {
          const updatedQuantity = existingCartItem.Quantity + increment;

          if (userdetails?.Email) {
            await updatecartItem(existingCartItem._id, prod._id, updatedQuantity, userdetails.Email);
          }
          increaseQuantity(prod._id);
        } else {
          const initialQuantity = isFreshProduce ? 0.5 : 1;

          if (userdetails?.Email) {
            const cartData = {
              productId: prod._id,
              Email: userdetails.Email,
              Quantity: initialQuantity
            };
            await savecartitems(cartData);
          }

          addToCart({ ...prod, Quantity: initialQuantity });
        }
      }
      toast.success(`${prods?.IngredientName} Products are added to cart!`);
    } catch (error) {
      console.error("Error adding products to cart:", error);
      toast.error("Failed to add some products to cart. Please try again.");
    }
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Magizh Kadai - Your one-stop shop for quality products online.</title>
          <meta name="keywords" content="Magizh Kadai, online shopping, best deals, quality products, affordable prices, buy online, e-commerce store" />
          <meta name="description" content="Shop a diverse range of quality products at Magizh Kadai. Enjoy the best deals, secure payments, fast delivery, and a seamless online shopping experience." />
          <meta name="author" content="Magizh Kadai" />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Magizh Kadai - Your One-Stop Online Store" />
          <meta property="og:description" content="Shop a diverse range of quality products at Magizh Kadai. Enjoy the best deals, secure payments, fast delivery, and a seamless online shopping experience." />
          <meta property="og:url" content="https://www.magizhkadai.com/" />
          <meta property="og:image" content="https://www.magizhkadai.com/images/og/og-image.jpeg" />
        </Helmet>
      </HelmetProvider>
      <div className='max-w-[1860px] mx-auto bg-white dark:bg-black z-45'>
        {/* <HeroSection mainCarouselBanners={mainCarouselBanners1} categoryBanners={categoryDealsBanners1} /> */}
        {/* Render All Active Offers */}
        {/* {offers.map((offer) => renderOffer(offer))} */}
        {/* <div className='px-3'><SwiperMin Product={Product} /></div> */}
        {/* <NewArrivals products={Product} /> */}
        {/* <div className=''><AllProducts groupedProducts={groupedProducts} categoryProducts={categoryProducts} /></div> */}
        <div className='mt-5  px-2  '>
          <HomrProducts />
        </div>
        {/* <IngredientSwipe  title="Indian Cuisine Combo Ingredients" visible={visible} setVisible={setVisible} selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct} handleProductClick={handleProductClick} AddtoCartProduct={AddtoCartProduct} /> */}
        {/* <Testimoni testimonials={testimonials} /> */}
      </div>
    </>
  )
}