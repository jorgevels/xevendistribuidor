import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shoesBanner from "../../assets/images/BANNER-BIENESTAR.png";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import ClientSlider from "../../components/ClientSlider/ClientSlider";
import Hero from "../../components/Hero/Hero";
import Product from "../../components/Product/Product";
import Title from "../../components/Title/Title";
import { fetchProducts } from "../../redux/products/products_actions";

import "./Welfare.scss";

const BienestarIntimoPage = () => {
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const bienestarIntimoProducts = products.filter(
    (product) => product.title === "Bienestar"
  );

  return (
    <>
      <Banner image={shoesBanner} />
      <Categories />

      <section className="py-5 no-pt">
        <div className="container">
          <Title title="BIENESTAR, PLACER Y CUIDADO ÍNTIMO" />

          <div className="row">
            {bienestarIntimoProducts.map((product) => (
              <div
                key={product.id}
                className="col-6 col-md-4 mx-auto mb-4"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Hero
        subtitleHeading="bienestar"
        subtitleFooter="íntimo"
        offer="30% OFF"
        title="Cuida tu cuerpo, disfruta tu intimidad"
        text="Envíos gratis en el área metropolitana en pedidos superiores a $120.000"
      />

      <ClientSlider />
      {/* <ButtonWhatsApp showButton={!sideCartOpen} /> */}
    </>
  );
};

export default BienestarIntimoPage;
