import flower from "/assets/herosection/flower.svg";
import SwiperMax from "../Swiper/SwiperMax";
import SwiperMin from "../Swiper/SwiperMin";
import "./MegaOffer.css";

export default function HeroSection({ mainCarouselBanners, categoryBanners }) {
  return (
    <>
      <section>

        <article className="w-full px-3 pb-3 lg:pb-5 bg-white dark:bg-black">
          <SwiperMax banners={mainCarouselBanners} />{" "}
        </article>

        <article className="w-full px-3 pb-3 bg-white dark:bg-black lg:pb-5">
          <SwiperMin banners2={categoryBanners} />{" "}
        </article>

      </section>
    </>
  );
}

