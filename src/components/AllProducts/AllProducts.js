import { useState } from "react";
import { useSelector } from "react-redux";

import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import Title from "../Title/Title";

import "./AllProducts.scss";

const AllProducts = ({ products }) => {
  const [visible, setVisible] = useState(12);
  const { loading } = useSelector((state) => state.products);

  const showMoreProducts = () => {
    setVisible((oldValue) => oldValue + 12);
  };

  if (loading) {
    return (
      <section className="py-5">
        {/*  <section className="py-5 section-bg"> */}
        <div className="container">
          <Title title="ACTUALIZACIÓN DE PRODUCTOS" />
          <div className="row">
            {/*  <div className="col-6 col-md-4 mb-4 mb-md-0 mx-auto"> */}
            <div className="col-6 col-md-4 mx-auto mb-4 mb-md-0">
              {/*  <div className="col-10 col-md-4 mb-4 mb-md-0 "> */}
              <Loading />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 no-pt">
      {/*  <section className="py-5 section-bg"> */}
      <div className="container">
        <Title title="NUESTROS PRODUCTOS" />
        <div className="row">
          {products.slice(0, visible).map((product) => {
            return (
              <div
                key={product.id}
                /* className="col-10 col-md-6 col-lg-4 mx-auto" */
                className="col-6 col-md-4 mx-auto mb-4 mb-md-0"
              >
                <Product product={product} />
              </div>
            );
          })}
        </div>
        {visible === products.length ? null : (
          <div className="row">
            <div style={{ textAlign: "center" }} className="col-6 mx-auto pt-3">
              <button onClick={showMoreProducts} className="btn btn-grey">
                Mostrar más
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
