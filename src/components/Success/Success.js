import { useSelector } from "react-redux";

/* import useGoogleAddress from '../hooks/useGoogleAddress'; */
/* import Map from '../components/Map'; */

import "./Success.scss";

const Success = () => {
  const { buyer } = useSelector((state) => state.products);

  /* const buyerLocation = useGoogleAddress(
    // destructure it
    buyer[0].address,
    buyer[0].city,
    buyer[0].province,
    buyer[0].country
  ); */

  return (
    <div className="Succes">
      <div className="Success-content">
        <h2>{`Gracias ${buyer.name} por tu compra, nuestro equipo logistico despachara tu pedido, `}</h2>
        <span>Le llegará dentro de 3 días a partir de ahora..</span>

        <div className="Success-map">{/*  <Map data={buyerLocation} /> */}</div>
      </div>
    </div>
  );
};

export default Success;
