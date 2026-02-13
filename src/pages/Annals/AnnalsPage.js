import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import ButtonWhatsApp from "../../components/ButtonWhatsApp/ButtonWhatsApp";
import Categories from "../../components/Categories/Categories";
import ClientSlider from "../../components/ClientSlider/ClientSlider";
import Hero from "../../components/Hero/Hero";
import Product from "../../components/Product/Product";
import Title from "../../components/Title/Title";
import { fetchProducts } from "../../redux/products/products_actions";

/* import shoesBanner from "../assets/images/shoes-banner.jpg"; */
import shoesBanner from "../../assets/images/Banner-Anales.png";
import "./Annals.scss";

const WaxesPage = () => {
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const WaxesProducts = products.filter((product) => product.title === "Anal");

  return (
    <>
      <Banner image={shoesBanner} />
      <Categories />
      <section className="py-5 no-pt">
        <div className="container">
          <Title title="LOS MEJORES LUBRICANTES PARA NUEVAS EXPERIENCIAS" />
          <div className="row">
            {WaxesProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  /* className="col-10 col-md-6 col-lg-4 mx-auto" */
                  className="col-6 col-md-4 mx-auto mb-4 mb-md-0 "
                >
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Hero
        subtitleHeading="extra"
        subtitleFooter="online"
        offer="30% off"
        title="Placer, Bienestar y Cuidado Intimo"
        text="Envíos gratis en el área metropolitana en pedidos superiores a $ 120.000"
      />
      <ClientSlider />
     {/*  <ButtonWhatsApp showButton={!sideCartOpen} /> */}
    </>
  );
};

export default WaxesPage;
