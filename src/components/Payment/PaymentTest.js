import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addNewOrder } from "../../redux/products/products_actions";
import { formatPrice } from "../../utils/formatPrice";

import "./Payment.scss";

const Payment = () => {
  const dispatch = useDispatch();
  const { cart, buyer } = useSelector((state) => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log("Location:", location); // Verifica si location está definido
    if (location && location.state && location.state.totalPrice !== undefined) {
      setTotalPrice(location.state.totalPrice);
      console.log("Total de payment:", location.state.totalPrice);
    }
  }, [location.state]);

  const paypalOptions = {
    clientId: "sb",
    intent: "capture",
    currency: "USD",
  };

  const buttonStyles = {
    layout: "vertical",
    shape: "rect",
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);

    if (data.status === "COMPLETED") {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };

      dispatch(addNewOrder(newOrder));
      history.push("/info/success");
    }
  };

  return (
    <div className="Payment">
      <div className="Payment__content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment__item" key={item.id}>
            <div className="Payment__element">
              <h4>{item.name}</h4>
              <span> {formatPrice(item.price)}</span>
            </div>
          </div>
        ))}
        <div className="Payment__elements">
          <h4> Total COP {formatPrice(totalPrice)}</h4>
        </div>

        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={totalPrice}
            onPaymentStart={() => console.log("Start Payment")}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
