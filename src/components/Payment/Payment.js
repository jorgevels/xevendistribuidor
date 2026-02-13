import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addNewOrder } from "../../redux/products/products_actions";
import { formatPrice } from "../../utils/formatPrice";
import { generateSignature } from "../../utils/signatureUtils";
import { generarReferencia } from "../../utils/GeneradorReferenciaPago";

import "./Payment.scss";

// QUE PENDIENTE SOLUCIONAR ERROR CON LA FIRMA
// QUE SE GENERE LA FIRMA SOLO CUANDO SEA NECESARIO

const referenciaPago = generarReferencia();
const Payment = () => {
  const dispatch = useDispatch();
  const { cart, buyer } = useSelector((state) => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [signatureIntegrity, setSignatureIntegrity] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.totalPrice !== undefined) {
      setTotalPrice(location.state.totalPrice);
      localStorage.setItem("totalPrice", location.state.totalPrice);
    }
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice !== null) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }
    return () => {
      localStorage.removeItem("totalPrice");
    };
  }, [location.state]);

  /*   const pub_key = process.env.REACT_APP_PUB_KEY; */
  const secrect_integrety = process.env.REACT_APP_SECRECT_INTEGRETY;

  const pub_key = "pub_test_bW91NKPjW2xBBO3xOaBZuxYrrYtBALFG";

  /* const secrect_integrety = "test_integrity_GTT2Ug1TiDsNSsGTvExablWxPkVApHJ5"; */

  const generateUniqueCode = () => {
    const characters = "0123456789abcdef";
    let uniqueCode = "";

    for (let i = 0; i < 64; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueCode += characters[randomIndex];
    }

    return uniqueCode;
  };

  const handlePaymentSuccess = (data) => {
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
  /* console.log("firmaCON HAS", signatureIntegrity); */

  useEffect(() => {
    const concatenatedData = `reference=${referenciaPago}&amount_in_cents=${parseInt(
      totalPrice * 100
    )}&currency=COP&secret_integrity=${secrect_integrety}`;
    const hash = generateSignature(concatenatedData, secrect_integrety);
    console.log("Firma generada:", hash);

    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = true;
    script.setAttribute("data-render", "button");
    script.setAttribute("data-public-key", pub_key);
    script.setAttribute("data-currency", "COP");
    script.setAttribute("data-amount-in-cents", parseInt(totalPrice * 100)); // Convert to cents
    script.setAttribute("data-reference", referenciaPago);
    script.setAttribute("data-signature:integrity", hash); // Utiliza la firma generada directamente
    script.setAttribute(
      "data-redirect-url",
      "http://localhost:3000/#/info/success"
    );

    console.log("Firma enviada a Wompi:", hash);
    document.getElementById("wompi-checkout").appendChild(script);

    return () => {
      const wompiCheckout = document.getElementById("wompi-checkout");
      if (wompiCheckout && wompiCheckout.contains(script)) {
        wompiCheckout.removeChild(script);
      }
    };
  }, [totalPrice]); // Use un arreglo vacío para que se ejecute solo una vez

  return (
    <div className="Payment">
      <div className="Payment__content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment__item" key={item.id}>
            <div className="Payment__element">
              <h4>{item.name}</h4>
              <span>{formatPrice(item.price)}</span>
            </div>
          </div>
        ))}
        <div className="Payment__elements">
          <h4>Total COP {formatPrice(totalPrice)}</h4>
        </div>
        <div id="wompi-checkout"></div>
      </div>
    </div>
  );
};

export default Payment;
