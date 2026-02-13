import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
import "./OrderPagoWhatsApp.scss";

const InfoPagoWhatsApp = () => {
  const { cart } = useSelector((state) => state.products);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    // Obtener la información del localStorage al montar el componente
    const storedOrderInfo = localStorage.getItem("orderInfo");
    if (storedOrderInfo) {
      try {
        const parsedOrderInfo = JSON.parse(storedOrderInfo);
        setOrderInfo(parsedOrderInfo);
      } catch (error) {
        console.error("Error parsing orderInfo from localStorage:", error);
      }
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    if (cart.length > 0) {
      // Calcular el nuevo precio total y guardar la cantidad de cada elemento
      const newOrderInfo = cart.reduce(
        (acc, item) => {
          const totalPrice = acc.totalPrice + item.price * item.qty;
          acc.cartItems.push({ ...item, quantity: item.qty });
          return { ...acc, totalPrice };
        },
        { cartItems: [], totalPrice: 0 }
      );

      // Guardar la información completa del carrito en el localStorage
      localStorage.setItem("orderInfo", JSON.stringify(newOrderInfo));
      setOrderInfo(newOrderInfo);
    }
  }, [cart]);

  return (
    <div className="Information__container">
      <div className="Informacion__title">
        <h3>Resumen de tu orden</h3>
      </div>
      <div className="Information__Sidebar">
        {orderInfo && orderInfo.cartItems && orderInfo.cartItems.length > 0 ? (
          orderInfo.cartItems.map((item) => (
            <div className="Information__item" key={item.id}>
              <img
                className="Information__image"
                src={item.image}
                alt="product"
              />
              <span className="Information__count">{item.quantity}</span>
              <div className="Information__element">
                <h4>{item.name}</h4>
                {/* <p>{item.description}</p> */}
                <span>Precio: {formatPrice(item.price)}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No tienes ordenes pendientes</div>
        )}
        <div className="Information__item-total">
          <div className="Information__element-total">
            Total: <span>COP{formatPrice(orderInfo?.totalPrice || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPagoWhatsApp;
