
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
import { getallproducts } from '../../shared/services/apiproducts/apiproduct.js'
import SwiperMin from '../../shared/Components/Home/SwiperMin.jsx'
import { useCallback } from 'react'

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [rows, setRows] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Product, setProduct] = useState(null);
  const [mainCarouselBanners, setMainCarouselBanners] = useState([]);
  const [categoryDealsBanners, setCategoryDealsBanners] = useState([]);
  const { addToCart, cartItems, increaseQuantity, } = useCart();
  const { userdetails } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch banners
        const bannerResponse = await getallbanners();
        const banners = bannerResponse.resdata || [];
        const mainCarousel = banners.find((b) => b.banner_type === "Main Carousel");
        const categoryDeals = banners.find((b) => b.banner_type === "Category Deals");
        if (mainCarousel) setMainCarouselBanners(mainCarousel.Images);
        if (categoryDeals) setCategoryDealsBanners(categoryDeals.Images);

        // Fetch offers
        const offerResponse = await getalloffers();
        const activeOffers = offerResponse.resdata.filter(
          (offer) => offer.Status === "Active"
        );
        setOffers(activeOffers);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const productfetch = useCallback(async () => {
    const productResponse = await getallproducts();
    setProduct(productResponse.resdata);
    console.log(productResponse.resdata);
  }, []);

  useEffect(() => {
    productfetch();
  }, [productfetch]);

  const groupedProducts = useMemo(() => {
    return Product?.reduce((acc, product) => {
      if (!acc[product.Category]) {
        acc[product.Category] = [];
      }
      acc[product.Category].push(product);
      return acc;
    }, {});
  }, [Product]);


  const renderOffer = (offer) => {
    const products = offer.Products.map((product) => ({
      ...product,
      img: `${apiurl()}/${product.Images[0]}`,
    }));

    switch (offer.Design) {
      case "Design_1":
        return <MegaOffers
          key={offer._id}
          title={offer.Title || "Mega Offers"}
          products={products}
          styles={{
            BGColor: offer.BGColor || "#540045",
            titleColor: offer.titlecolor || "#fff",
            CardBackgroundColor: offer.CardBackgroundColor || "#ffffff",
            CardBorderColor: offer.CardBorderColor || "#000",
            CardImageBorderColor: offer.CardImageBorderColor || "#ccc",
            CardTextColor: offer.CardTextColor || "#000",
            DiscountTextColor: offer.DiscountTextColor || "#ff0000",
          }}
          border={offer.Border}
        />
      case "Design_2":
        return <TopDiscount
          key={offer._id}
          products={products}
          styles={{
            title: offer.Title || "Top Discount",
            titleBgcolor: offer.titleBgcolor || "#f0c135",
            titleColor: offer.titlecolor || "#994d00",
            BorderColor1: offer.BorderColor1 || "#b58d14",
            BorderColor2: offer.BorderColor2 || "#f5d164",
            CardOverlayColor1: offer.CardOverlayColor1 || "#a87f03",
            CardOverlayColor2: offer.CardOverlayColor2 || "#fad66b",
            ImageBackgroundColor1: offer.ImageBackgroundColor1 || "#fffffc",
            ImageBackgroundColor2: offer.ImageBackgroundColor2 || "#fff1b5",
            DiscountBgColor: offer.DiscountBgColor || "#ed135c",
            CardTextColor: offer.CardTextColor || "#FFFFFF",
            DiscountTextColor: offer.DiscountTextColor || "#ffe357",
          }}
          border={offer.Border}
        />;
      case "Design_3":
        return <DailyDeals
          key={offer._id}
          Deals={products}
          styles={{
            Title: offer.Title || "Daily Deals",
            TitleBgColor: offer.TitleBgColor || "#007369",
            TitleColor: offer.TitleColor || "#FFFFFF",
            BGColor1: offer.BGColor1 || "#DCFFFC",
            BGColor2: offer.BGColor2 || "#FFFFFF",
            CardColor: offer.CardColor || "#FFFFFF",
            CardBorderColor: offer.CardBorderColor || "#007369",
            TextBgColor: offer.TextBgColor || "#007369",
            TextColor: offer.TextColor || "#FFFFFF",
            PriceColor: offer.PriceColor || "#FFFFFF",
            ButtonBGColor: offer.ButtonBGColor || "#D90028",
            ButtonTextColor: offer.ButtonTextColor || "#FFFFFF",
          }}
          border={offer.Border}
        />;
      default:
        return null; // Ignore unknown designs
    }
  };

  const handleProductClick = (prod) => {
    setSelectedProduct(prod);
    setVisible(true);
  };

  // const AddtoCartProduct = async (prods) => {
  //   console.log(prods)
  //   // toast.success("Added to cart successfully")
  //   const cartItemsFromStore = cartItems || [];
  //   prods?.Products.map(async prod=>{
  //     const existingCartItem = cartItemsFromStore.find(item => item._id === prod.Products_id);
  //     if (existingCartItem) {
  //       const updatedQuantity = existingCartItem.Quantity + 1;

  //       if (userdetails?.Email) {
  //       await updatecartItem(existingCartItem._id, prod._id, updatedQuantity, userdetails.Email);
  //       }
  //       increaseQuantity(prod._id);
  //       // toast.success(`Quantity increased! ${prod.Product_Name}: ${updatedQuantity}`);
  //     }
  //     else {

  //       if (userdetails?.Email) {
  //       const cartData = { productId: prod._id, Email: userdetails.Email, Quantity: 1 };
  //       await savecartitems(cartData);
  //       }

  //       addToCart({ ...prod, Quantity: 1 });
  //       // toast.success(`Product added to cart! ${prod?.Product_Name}`);
  //     }
  //   })
  //   toast.success(`${prods?.IngredientName} Products are added to cart!`)
  // };

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

  const testimonials = [
    {
      name: "Anoushka",
      text: "Fantastic service! This online grocery store has saved me so much time. They have a great selection, including lots of vegan and gluten-free options, which are hard to find.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/Testi.png",
      qualification: 'Medical Assistant',
      rating: 5,
    },
    {
      name: "Rithvik",
      text: "Great selection of spices! Fast delivery to my doorstep in San Francisco.Their customer service is top-notch.Received my order within 2 days.Quality of products is excellent.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/man.png",
      qualification: 'Web Designer',
      rating: 5,
    },
    {
      name: "Ramesh Krishnamurthy",
      text: "Love the variety of South Indian snacks!.Will order again! Prices are very competitive.Their website is user-friendly and easy to navigate.Received my order within 3 days.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/man.png",
      qualification: 'Marketing Engineer',
      rating: 5,
    },
    {
      name: "Arjun Rao",
      text: "Easy navigation, reasonable prices Received my order within 4 days. Quality of products is good.However, would love to see more organic options. Good customer service.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/man.png",
      qualification: 'Nursing Assistant',
      rating: 5,
    },
    {
      name: "Kavita Sridharan",
      text: "The website is super intuitive, and placing an order takes just a few minutes. I love the variety and the timely updates on my order status. Highly recommend it for busy families!",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/Testi.png",
      qualification: 'Web Developer',
      rating: 5,
    },
    {
      name: "Vishwajeet",
      text: "I love shopping for groceries on this website! The variety of fresh produce and pantry staples is impressive, and the user-friendly interface makes the process quick and easy.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/man.png",
      qualification: 'Marketing Engineer',
      rating: 5,
    },
    {
      name: "Suresh Kumar",
      text: "Fast delivery, great customer service, and a seamless shopping experience. I’ve been ordering for months, and the website has consistently delivered exactly what I needed.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/man.png",
      qualification: 'Medical Assistant',
      rating: 5,
    },
    {
      name: "Saritha Jain",
      text: "The product range is incredible! From fresh produce to pantry staples, everything is available in one place. The website is easy to navigate, clear product descriptions and images.",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/Testi.png",
      qualification: 'Nursing Assistant',
      rating: 5,
    },
    {
      name: "Bhavani",
      text: "I can find everything I need here, from everyday staples to gourmet items. The website is easy to navigate, and the customer support team is super helpful. I recommend this!",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/Testi.png",
      qualification: 'Web Developer',
      rating: 5,
    },
    {
      name: "Hariom",
      text: "The website is easy to navigate, and I can quickly find everything I need. The fresh produce is top quality, and my orders always arrive on time and well-packaged.Fantastic service!",
      avatar: "/assets/Images/About/Quotation.png",
      avata: "/images/Testimonial/man.png",
      qualification: 'Web Designer',
      rating: 5,
    },
  ];

  return (
    <>
      <div className='max-w-[1860px] mx-auto bg-white dark:bg-black  z-45'>
        <HeroSection mainCarouselBanners={mainCarouselBanners1} categoryBanners={categoryDealsBanners1} />
        {/* Render All Active Offers */}
        {/* {offers.map((offer) => renderOffer(offer))} */}

        <div className='px-3'><SwiperMin Product={Product} /></div>
        <NewArrivals products={Product} />
        <div className='px-3'><AllProducts groupedProducts={groupedProducts} /></div>

        {/* <IngredientSwipe  title="Indian Cuisine Combo Ingredients" visible={visible} setVisible={setVisible} selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct} handleProductClick={handleProductClick} AddtoCartProduct={AddtoCartProduct} /> */}
        <Testimoni testimonials={testimonials} />
      </div>
    </>
  )
}