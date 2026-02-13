import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { MdDelete, MdWhatsapp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartEmptyImg from "../../assets/images/cart-empty.jpg";
import { removeFromCart } from "../../redux/products/products_actions";
import { closeSideCartWhatsApp } from "../../redux/sidebar/sidebar_actions";
import { formatPrice } from "../../utils/formatPrice";
import ButtonWhatsApp from "../ButtonWhatsApp/ButtonWhatsApp";
import "./CartSidebarWhatsApp.scss";

const CartSidebarWhatsApp = () => {
  const { cart } = useSelector((state) => state.products);
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false); // Definir estado para el sidebar del carrito

  useEffect(() => {
    // Establecer el estado del sidebar del carrito según sideCartOpen
    setIsCartSidebarOpen(sideCartOpen);
  }, [sideCartOpen]);

  useEffect(() => {
    let price = 0;

    cart.forEach((item) => {
      price += item.qty * item.price;
    });

    setTotalPrice(price);
  }, [cart]);

  // Guardar información del carrito en el almacenamiento local
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div
      className={
        isCartSidebarOpen ? "cart-overlay cart-overlay--show" : "cart-overlay"
      }
    >
      <div
        className={
          isCartSidebarOpen ? "cart-sidebar cart-sidebar--show" : "cart-sidebar"
        }
      >
        <div className="cart-sidebar__heading">
          <p className="cart-sidebar__title">Tu Carrito</p>
          <span className="cart-sidebar__close">
            <CgCloseO onClick={() => dispatch(closeSideCartWhatsApp())} />
          </span>
        </div>
        <div className="cart-sidebar__content">
          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <div key={item.id} className="cart-sidebar__products">
                  <div className="cart-sidebar__product-image-container">
                    <img
                      className="cart-sidebar__product-image"
                      src={item.image}
                      alt="product"
                    />
                  </div>
                  <div className="cart-sidebar__product-info">
                    <p className="cart-sidebar__product-name">{item.name}</p>
                    <div className="cart-sidebar__prices">
                      <p className="cart-sidebar__product-qty">{item.qty} X</p>
                      <p className="cart-sidebar__product-price">
                        {formatPrice(item.price)}
                      </p>
                      <p className="cart-sidebar__delete">
                        <MdDelete
                          onClick={() => dispatch(removeFromCart(item.id))}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cart-sidebar__empty-image-container">
              <img
                className="cart-sidebar__empty-image"
                src={cartEmptyImg}
                alt="cart is empty"
              />
            </div>
          )}
        </div>
        <div className="cart-sidebar__footer">
          Total: {formatPrice(totalPrice)}
        </div>
        {cart.length > 0 ? (
          <div className="cart-sidebar__btn-continue ">
            <Link
              to="/OrderWhatsApp"
              className="btn btn-black-continue btn-whatsapp"
              onClick={() => dispatch(closeSideCartWhatsApp())}
            >
              {" "}
              <MdWhatsapp className="Icon-whatsapp" />
              Ordenar por WhatsApp
            </Link>
          </div>
        ) : (
          <Link
            to="/products"
            className="btn btn-black-continue"
            onClick={() => dispatch(closeSideCartWhatsApp())}
          >
            COMPRAR
          </Link>
        )}
       {/*  <ButtonWhatsApp showButton={!isCartSidebarOpen} />{" "} */}
        {/* Pasar isCartSidebarOpen como prop showButton */}
      </div>
    </div>
  );
};

export default CartSidebarWhatsApp;
