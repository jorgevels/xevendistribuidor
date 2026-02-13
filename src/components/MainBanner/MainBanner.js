import BannerCarousel from "../BannerCarousel/BannerCarousel";
import ButtonWhatsApp from "../ButtonWhatsApp/ButtonWhatsApp";

import "./MainBanner.scss";

const MainBanner = ({ isCartSidebarOpen }) => {
  console.log("isCartSidebarOpen:", isCartSidebarOpen);
  return (
    <>
      <div className="banner">
        <BannerCarousel />
        {/* <div className="banner__hero">
          <h1 className="banner__title">
            Placer
            <br />
            Bienestar
            <br />y cuidado initimo
          </h1>
          <Link to="/products" className="btn btn-pink-hero">
            Compra ahora
          </Link>
        </div> */}
      </div>

     {/*  <ButtonWhatsApp showButton={!isCartSidebarOpen} /> */}
    </>
  );
};

export default MainBanner;
