import { useSelector } from "react-redux";

import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import Title from "../Title/Title";
import "./BestProducts.scss";

const BestProducts = ({ bestProducts }) => {
  const { loading } = useSelector((state) => state.products);

  if (loading) {
    return (
      <section className="py-5 no-pt">
        <div className="container">
          <Title title="ACTUALIZACIÓN DE PRODUCTOS MAS VENDIDOS" />
          <div className="row">
            {/*  <div className="col-10 mx-auto col-md-6"> */}
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
      <section className="py-5 no-pt">
        <div className="container">
          <Title title="MAS VENDIDOS " />
          <div className="row">
            {bestProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  /*  className="col-10 col-md-6 col-lg-4 mx-auto" */
                  className="col-6 col-md-4 mx-auto mb-4 mb-md-0"
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

export default BestProducts;
