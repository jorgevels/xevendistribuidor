import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";
import ClientSlider from "../ClientSlider/ClientSlider";
import Gallery from "../Gallery/Gallery";
import Hero from "../Hero/Hero";
import Loading from "../Loading/Loading";
import Title from "../Title/Title";
import "./SingleProduct.scss";
import SingleProductInfo from "./SingleProductInfo/SingleProductInfo";

const SingleProduct = ({ singleProduct }) => {
  const { loading } = useSelector((state) => state.products);
  const history = useHistory();

  if (loading || !singleProduct || Object.keys(singleProduct).length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <Title title="ACTUALIZACIÓN DE VENTAS" />
          <div className="row">
            <div className="col-10 mx-auto col-md-6 col-sm-4">
              <Loading />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { image, gallarey, id, name, brand, price, stars, description } =
    singleProduct;

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="goBack" onClick={() => history.goBack()}>
            <AiOutlineArrowLeft />
          </div>
          <Title title={name} />

          <div className="singleProduct__container">
            <div className="singleProduct__sticky">
              {/* Agregado key para forzar re-render del carrusel */}
              <Gallery key={id} id={id} image={image} gallarey={gallarey} />
            </div>

            <div className="singleProduct__scrollable">
              <SingleProductInfo
                name={name}
                brand={brand}
                /* price={price} */
                stars={stars}
                description={description}
                id={id}
              />
            </div>
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
    </>
  );
};

export default SingleProduct;
