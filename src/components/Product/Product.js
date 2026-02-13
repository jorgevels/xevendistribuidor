import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BlurUpImage from "../BlurUpImage/BlurUpImage";
import Stars from "../Stars/Stars";
import "./Product.scss";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product mb-4 no-pt">
      <Link to={`/products/${product.id}`}>
        <div className="product__image-container">
          <div
            className={`product__image-times ${
              product.time === "Nuevo" ? "fixed" : ""
            }`}
          >
            {product.time === "Nuevo" && (
              <div>
                <h3 className="product__image-time">{product.time}</h3>
              </div>
            )}
          </div>
          <BlurUpImage
            src={product.image}
            alt={product.name}
            className="product__image"
          />
        </div>
      </Link>
      <div className="product__footer">
        <div className="product__footer-heading">
          <Link to={`/products/${product.id}`}>
            <h3 className="product__footer-title">{product.name}</h3>
          </Link>
          {/* <span className="product__footer-icon">
            <AiOutlineShopping
              onClick={() => dispatch(addToCart(product.id))}
            />
          </span> */}
        </div>
        <div className="product__footer-prices">
          {/* <span>
            <span className="product__footer-price">
              {formatPrice(product.price)}
            </span>
            <span className="product__footer-price--old">
              {formatPrice(product.oldPrice)}
            </span>
          </span> */}
          <Stars stars={product.stars} />
        </div>
        {product.stock === "Agotado" && (
          <div className="product__out-of-stock">
            <span>Agotado</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
