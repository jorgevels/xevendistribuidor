import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeaturedProductsBanner from "../assets/images/Banner-Destacados.png";
import Banner from "../components/Banner/Banner";
import ButtonWhatsApp from "../components/ButtonWhatsApp/ButtonWhatsApp";
import ClientSlider from "../components/ClientSlider/ClientSlider";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Hero from "../components/Hero/Hero";
import { fetchProducts } from "../redux/products/products_actions";

const FeatureProductsPage = () => {
  const { sideCartOpen } = useSelector((state) => state.sidebar); // Obtener el estado del sidebar del carrito
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  return (
    <>
      {/* <MainBanner />
      <Categories />
      <BestProducts bestProducts={bestProducts} /> */}
      <Banner image={FeaturedProductsBanner} />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <Hero
        subtitleHeading="extra"
        subtitleFooter="online"
        offer="30% off"
        title="Placer, Bienestar y Cuidado Intimo"
        text="Envíos gratis en el área metropolitana en pedidos superiores a $ 120.000"
      />
      <ClientSlider />
      {/* <ButtonWhatsApp /> */}
      {/*  <ButtonWhatsApp showButton={true} /> */}
     {/*  <ButtonWhatsApp showButton={!sideCartOpen} /> */}
    </>
  );
};

export default FeatureProductsPage;
