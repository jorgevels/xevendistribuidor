import React, { useRef, useState, useEffect } from "react"; // Importa React y varios hooks de React
import { useSelector, useDispatch } from "react-redux"; // Importa hooks de react-redux para acceder al estado de Redux
import { Link, useHistory } from "react-router-dom"; // Importa componentes de react-router-dom para manejar la navegación
import { addToBuyer } from "../../redux/products/products_actions"; // Importa la acción addToBuyer desde el archivo de acciones de Redux
import { formatPrice } from "../../utils/formatPrice"; // Importa una función para formatear precios desde un archivo de utilidades
import "./Info.scss"; // Importa estilos Sass específicos para este componente

const InfoPago = () => {
  // Define un componente de función llamado InfoPago
  const dispatch = useDispatch(); // Obtiene la función dispatch del store de Redux para despachar acciones
  const { cart } = useSelector((state) => state.products); // Obtiene el estado 'cart' del store de Redux utilizando useSelector
  const [totalPrice, setTotalPrice] = useState(0); // Declara un estado para el precio total de la compra
  const [deliveryOption, setDeliveryOption] = useState("Domicilio"); // Declara un estado para la opción de entrega
  const [showAddressFields, setShowAddressFields] = useState(true); // Declara un estado para controlar si se muestran los campos de dirección
  const history = useHistory(); // Obtiene el objeto de historial de navegación de react-router-dom

  const form = useRef(null); // Crea una referencia para el formulario

  useEffect(() => {
    // Efecto para calcular el precio total cuando cambia el carrito o la opción de entrega
    let totalPriceCalc = 0; // Variable para calcular el precio total

    cart.forEach((item) => {
      // Itera sobre los elementos del carrito
      totalPriceCalc += item.qty * item.price; // Calcula el precio total sumando el precio de cada artículo multiplicado por su cantidad
    });

    if (deliveryOption === "Domicilio") {
      // Si la opción de entrega es 'Domicilio'
      totalPriceCalc += 10000; // Agrega un cargo por entrega a domicilio
    }

    setTotalPrice(totalPriceCalc); // Actualiza el estado totalPrice con el valor calculado
  }, [cart, deliveryOption]); // Dependencias que provocan la ejecución del efecto

  const handleSubmit = () => {
    // Función para manejar el envío del formulario
    const formData = new FormData(form.current); // Obtiene los datos del formulario utilizando una referencia
    const buyer = {
      // Crea un objeto con la información del comprador
      name: formData.get("name"), // Obtiene el nombre del comprador del formulario
      email: formData.get("email"), // Obtiene el correo electrónico del comprador del formulario
      country: formData.get("country"), // Obtiene el país del comprador del formulario
      province: formData.get("province"), // Obtiene el departamento del comprador del formulario
      city: formData.get("city"), // Obtiene la ciudad del comprador del formulario
      delivery: deliveryOption, // Obtiene la opción de entrega seleccionada
      address: showAddressFields ? formData.get("address") : "", // Obtiene la dirección del comprador si se muestran los campos de dirección
      apto: showAddressFields ? formData.get("apto") : "", // Obtiene el apartamento del comprador si se muestran los campos de dirección
      cp: showAddressFields ? formData.get("cp") : "", // Obtiene el código postal del comprador si se muestran los campos de dirección
      phone: formData.get("phone"), // Obtiene el número de teléfono del comprador del formulario
    };

    dispatch(addToBuyer(buyer)); // Envía la información del comprador al store de Redux

    history.push({
      // Redirige a la página de información de pago
      pathname: "/info/payment",
      state: { totalPrice: totalPrice }, // Pasa el precio total como estado a la nueva ruta
    });
  };

  const handleDeliveryChange = (event) => {
    // Función para manejar el cambio en la opción de entrega
    const selectedOption = event.target.value; // Obtiene la opción de entrega seleccionada del evento
    setDeliveryOption(selectedOption); // Actualiza el estado de la opción de entrega

    if (selectedOption === "Domicilio") {
      // Si la opción seleccionada es 'Domicilio'
      setShowAddressFields(true); // Muestra los campos de dirección
    } else if (selectedOption === "Recoger en tienda") {
      // Si la opción seleccionada es 'Recoger en tienda'
      setShowAddressFields(false); // Oculta los campos de dirección
    }
  };

  return (
    // Devuelve la interfaz de usuario del componente
    <>
      <div className="Container">
        {" "}
        {/* Contenedor principal */}
        <div className="Information">
          {" "}
          {/* Contenido de información */}
          <div className="Information__content">
            {" "}
            {/* Contenido de información adicional */}
            <div className="Information__head">
              {" "}
              {/* Encabezado de información */}
              <h3>Informacion de Contacto</h3> {/* Título */}
            </div>
            <div className="Information__form">
              {" "}
              {/* Formulario de información */}
              <form ref={form}>
                {" "}
                {/* Formulario */}
                {/* Campos de entrada para la información del comprador */}
                <input type="text" placeholder="Nombre completo" name="name" />
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  name="email"
                />
                <input type="text" placeholder="País" name="country" />
                <input type="text" placeholder="Departamento" name="province" />
                <input type="text" placeholder="Ciudad" name="city" />
                <div>
                  {" "}
                  {/* Selector de tipo de entrega */}
                  <label>Tipo de entrega</label>
                </div>
                <select value={deliveryOption} onChange={handleDeliveryChange}>
                  <option value="Domicilio">Domicilio</option>
                  <option value="Recoger en tienda">Recoger en tienda</option>
                </select>
                {/* Campos de dirección que se muestran dependiendo de la opción de entrega */}
                {showAddressFields && (
                  <>
                    <input type="text" placeholder="Dirección" name="address" />
                    <input type="text" placeholder="Apartamento" name="apto" />
                    <input type="text" placeholder="Codigo postal" name="cp" />
                  </>
                )}
                <input
                  type="text"
                  placeholder="Número de teléfono"
                  name="phone"
                />{" "}
                {/* Campo de número de teléfono */}
              </form>
            </div>
          </div>
          {/* Sidebar con información del carrito y total de la compra */}
          <div className="Information__Sidebar">
            <h3>Informacion de la orden</h3>{" "}
            {/* Título de la información de la orden */}
            {cart.map(
              (
                item // Mapeo de elementos del carrito
              ) => (
                <div className="Information__item" key={item.id}>
                  {" "}
                  {/* Elemento del carrito */}
                  <img
                    className="Information__image"
                    src={item.image}
                    alt="product"
                  />
                  <span className="Information__count">{item.qty}</span>
                  <div className="Information__element">
                    {" "}
                    {/* Elemento individual */}
                    <h4>{item.name}</h4> {/* Nombre del producto */}
                    <span>{formatPrice(item.price)}</span>{" "}
                    {/* Precio formateado del producto */}
                  </div>
                </div>
              )
            )}
            {deliveryOption === "Domicilio" && ( // Si la opción de entrega es 'Domicilio'
              <div className="Information__item-total">
                {" "}
                {/* Elemento para el costo de envío */}
                <div className="Information__element-total">
                  {" "}
                  {/* Elemento individual del costo de envío */}
                  <h4>Costo de domicilio:</h4>{" "}
                  {/* Etiqueta del costo de envío */}
                  <h4>$10.000</h4> {/* Costo de envío */}
                </div>
              </div>
            )}
            <div className="Information__item-total">
              {" "}
              {/* Elemento para el precio total */}
              <div className="Information__element-total">
                {" "}
                {/* Elemento individual del precio total */}
                Total: {/* Etiqueta de total */}
                <span>COP{formatPrice(totalPrice)}</span>{" "}
                {/* Precio total formateado */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para continuar con el pago */}
      <div className="Information__buttons">
        <div className="Information__next">
          {" "}
          {/* Botón siguiente */}
          <button
            type="button"
            className="btn btn-pink-pay"
            onClick={handleSubmit}
          >
            {" "}
            {/* Botón con evento onClick */}
            FINALIZAR PAGO {/* Texto del botón */}
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoPago; // Exporta el componente InfoPago
