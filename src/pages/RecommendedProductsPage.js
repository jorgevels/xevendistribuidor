import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecommendedProductsBanner from "../assets/images/Banner-Recomendados.png";
import Banner from "../components/Banner/Banner";
import ButtonWhatsApp from "../components/ButtonWhatsApp/ButtonWhatsApp";
import ClientSlider from "../components/ClientSlider/ClientSlider";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "../components/RecommendedProducts/RecommendedProducts";
import { fetchProducts } from "../redux/products/products_actions";

const RecommendedProductsPage = () => {
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const recommendedProducts = products.filter(
    (product) => product.recommended === true
  );

  return (
    <>
      <Banner image={RecommendedProductsBanner} />
      <FeaturedProducts recommendedProducts={recommendedProducts} />
      <Hero
        subtitleHeading="extra"
        subtitleFooter="online"
        offer="30% off"
        title="Placer, Bienestar y Cuidado Intimo"
        text="Envíos gratis en el área metropolitana en pedidos superiores a $ 120.000"
      />
      <ClientSlider />
      {/* <ButtonWhatsApp showButton={true} /> */}
      {/* <ButtonWhatsApp showButton={!sideCartOpen} /> */}
    </>
  );
};

export default RecommendedProductsPage;
