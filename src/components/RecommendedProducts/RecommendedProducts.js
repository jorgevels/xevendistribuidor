import React from "react";
import { useSelector } from "react-redux";

import Title from "../Title/Title";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";

const RecommendedProducts = ({ recommendedProducts }) => {
  const { loading } = useSelector((state) => state.products);

  if (loading) {
    return (
      <section className="py-5">
        <div className="container">
          <Title title="ACTUALIZACIÓN DE PRODUCTOS RECOMENDADOS" />
          <div className="row">
            {/* <div className="col-10 mx-auto col-md-6"> */}
            <div className="col-6 col-md-4 mx-auto mb-4 mb-md-0">
              <Loading />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-5">
        <div className="container">
          <Title title="PRODUCTOS RECOMENDADOS" />
          <div className="row">
            {recommendedProducts.map((product) => {
              console.log(recommendedProducts);
              return (
                <div
                  key={product.id}
                  /*  className="col-10 col-md-6 col-lg-4 mx-auto" */
                  className="col-6 col-md-4 mx-auto mb-4 mb-md-0 "
                >
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecommendedProducts;
