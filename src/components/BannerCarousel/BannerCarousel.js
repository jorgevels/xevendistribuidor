import { Link } from "react-router-dom"; // 👈 importa Link si usas React Router
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./BannerCarousel.scss";

const banners = [
  {
    id: 1,
    image: require("../../assets/images/BANNER_SEN_INTIMO_SAN.jpg"),
    link: "/lubricant", // 👈 ruta interna de tu app
    
  },
  {
    id: 2,
   image: require("../../assets/images/BANNER_SEN_INTIMO_CAPUSINO.jpg"),
    link: "/toy",
  },
  {
    id: 3,
    image: require("../../assets/images/BANNER_SEN_INTIMO_MAYO2025-TRIO.jpg"),
    link: "/multiorgasm",
  },
  {
    id: 4,
    image: require("../../assets/images/BANNER_SEN_INTIMO_crema_y_splash_2024-01.jpg"),
    link: "/pheromonas",
  },
];

const BannerCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1500}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Link to={banner.link}>
            {/* 👆 Envuelve la imagen en un Link */}
            <img
              src={banner.image}
              alt={`Banner ${banner.id}`}
              className="carousel-image cursor-pointer"
            />
          </Link>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
};

export default BannerCarousel;
