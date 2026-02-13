import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"; // Importa useHistory de react-router-dom
import { formatPrice } from "../../../utils/formatPrice";
import Stars from "../../Stars/Stars";

import "./SingleProductInfo.scss";

const SingleProductInfo = ({ name, brand, price, stars, description, id }) => {
  const dispatch = useDispatch();
  const history = useHistory(); // Obtiene el objeto history de react-router-dom

  const handleGoBack = () => {
    // Utiliza history para regresar a la vista anterior
    history.goBack();
  };

  return (
    <>
      <div className="singleProduct">
        {/* <div className="goBack" onClick={handleGoBack}>
          <AiOutlineArrowLeft />
        </div> */}
        <h4 className="singleProduct__title">{name}</h4>
        <p className="singleProduct__brand">
          {" "}
          <span className="singleProduct__brand--span">MARCA:</span> {brand}
        </p>
        <h4 className="singleProduct__price">{formatPrice(price)}</h4>
        <Stars stars={stars} />
        <div className="singleProduct__desc">
          <ReactMarkdown
            components={{
              p: ({ node, children }) => <div className="mb-2">{children}</div>, // Evita anidación incorrecta
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5" {...props} />
              ),
              hr: () => <hr className="my-4" />,
              h1: ({ node, ...props }) => (
                <h1 className="text-left" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-left" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-left" {...props} />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
      {/* <button
        onClick={() => dispatch(addToCart(id))}
        type="button"
        className="btn btn-primary"
      >
        Añadir al Carrito
      </button> */}
    </>
  );
};

export default SingleProductInfo;
