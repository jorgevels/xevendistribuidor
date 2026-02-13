import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BestProducts from "../../components/BestProducts/BestProducts";
import Categories from "../../components/Categories/Categories";
import ClientSlider from "../../components/ClientSlider/ClientSlider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/Hero/Hero";
import MainBanner from "../../components/MainBanner/MainBanner";
import { fetchProducts } from "../../redux/products/products_actions";
import "../HomePage/HomePage.scss";

const HomePage = () => {
  const { products } = useSelector((state) => state.products);
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());

    return () => {};
  }, [dispatch]);

  const featuredProducts = products.filter(
    (product) => product.featured === true
  );
  const bestProducts = products.filter((product) => product.best === true);

  return (
    <>
      <MainBanner isCartSidebarOpen={sideCartOpen} />
      {/*      <PWAInstallButton /> */}

      <Categories />
      <BestProducts bestProducts={bestProducts} />
      <Hero
        subtitleHeading="extra"
        subtitleFooter="online"
        offer="30% off"
        title="Placer, Bienestar y cuidado initimo"
        text="Envíos gratis en el área metropolitana en pedidos superiores a $ 120.000"
      />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <ClientSlider />
    </>
  );
};

export default HomePage;
