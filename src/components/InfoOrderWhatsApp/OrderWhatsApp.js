import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { MdWhatsapp } from "react-icons/md";
import Swal from "sweetalert2";
import "./Order.scss";

// Función para generar un ID único para el pedido
const generateOrderId = () => {
  return "ORD-" + Math.random().toString(36).substr(2, 16).toUpperCase();
};

const OrderWhatsAppForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario

  // Lista de números de teléfono disponibles
  const phoneNumbers = ["+57 3236641535" /* "+57 3215299643" */];

  useEffect(() => {
    // Recuperar la información del carrito del almacenamiento local al montar el componente
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      setCartItems(cartData);
      // Calcular el precio total del carrito
      let total = 0;
      cartData.forEach((item) => {
        total += item.qty * item.price;
      });
      setTotalPrice(total);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Por favor, acepta los términos y condiciones para continuar.");
      return;
    }

    // Seleccionar un número de teléfono al azar
    const phoneNumber =
      phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];

    // Generar la URL del pedido
    const orderId = generateOrderId();
    const orderUrl = `${window.location.origin}/#/order-review/f8119184-6568-421b-85c6-5e6859ddbbd7/${orderId}`;

    // Generar el mensaje de WhatsApp con la URL del pedido
    const message = `Hola, soy ${formData.name},\nQuiero hacer este pedido en *XEVEN SENSUAL*:\n==============================\n`;
    const productsMessage = cartItems
      .map((item) => `- ${item.qty} *${item.name}:*  _$${item.price}_`)
      .join("\n");

    const totalPriceMessage = `\n           VALOR TOTAL: *$ ${totalPrice}*\n==============================\nMi información:\n\n*Nombre*: ${formData.name}\n*Teléfono de contacto:* ${formData.phoneNumber}\n*Direccion:* ${formData.address}\n*Ciudad:* ${formData.city}\n==============================\nMi pedido: ${orderUrl}\n==============================\n`;

    const freeShippingMessage = `*Envío*: Domicilio gratis en Medellin por compras superiores a $300mil. Enviamos a todo el país.\n==============================\n`;

    // Construir el enlace de WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message + freeShippingMessage + productsMessage + totalPriceMessage
    )}`;

    // Abrir el enlace de WhatsApp
    window.open(whatsappLink, "_blank");

    // Ocultar el formulario después de enviar el mensaje de WhatsApp
    setFormVisible(false);

    // Redirigir al usuario al inicio de la aplicación
    history.push("/");
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handlePolicyClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Política de Privacidad para Xeven Sensual",

      html: `
    <style>
      .small-text {
        font-size: 10px;
        text-align: justify;
      }
    </style>
    <div class="small-text">
      En Xeven Sensual nos comprometemos a proteger la privacidad de nuestros clientes y visitantes. <br><br>
        1. Información que Recopilamos. Recopilamos varios tipos de información para operar y mejorar nuestro negocio, incluyendo: Información Personal: Como nombre, dirección, correo electrónico, número de teléfono y datos de pago. Información del Pedido: Detalles sobre tus compras, incluidos productos adquiridos, cantidades y fechas.<br><br>
        2. Uso de la Información. Usamos la información recopilada para diversos fines, incluyendo: Procesar y entregar tus pedidos. Comunicarnos contigo respecto a tus pedidos y soporte al cliente. Enviarte correos electrónicos promocionales, si has dado tu consentimiento.  Mejorar nuestro sitio web y personalizar tu experiencia. Cumplir con leyes y regulaciones aplicables.<br><br>
        3. Compartir Información No vendemos ni compartimos tu información personal con terceros para sus propios fines comerciales. Sin embargo, podemos compartir información en las siguientes circunstancias: Proveedores de Servicios: Con terceros que nos ayudan a operar nuestro negocio, como procesadores de pago, empresas de envío y proveedores de marketing. Cumplimiento Legal: Para cumplir con leyes, regulaciones o solicitudes gubernamentales. Transferencias Comerciales: En caso de fusiones, adquisiciones o ventas de activos.<br><br> 
        4. Cookies y Tecnologías Similares Usamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Puedes controlar las cookies a través de la configuración de tu navegador. Al continuar usando nuestro sitio, aceptas el uso de cookies.<br><br>
        5. Seguridad de la Información Implementamos medidas de seguridad para proteger tu información personal. Sin embargo, ningún sistema es completamente seguro, por lo que no podemos garantizar la seguridad absoluta de tus datos.<br><br>
        6. Derechos de los Usuarios Dependiendo de tu ubicación, puedes tener derechos específicos relacionados con tu información personal, como el derecho a acceder, rectificar o eliminar tus datos. Para ejercer estos derechos, contáctanos por WhatsApp al 3025490562.<br><br>
        7. Cambios a la Política de Privacidad Nos reservamos el derecho de modificar esta política en cualquier momento. Te recomendamos revisar esta política periódicamente para estar al tanto de cualquier cambio.<br><br>
        8. Si tienes preguntas sobre esta Política de Privacidad, contáctanos por WhatsApp al 3025490562.<br><br>
    </div> 
  `,
      imageUrl:
        "https://res.cloudinary.com/imagesfull/image/upload/v1736204328/MetaStore/Logo-Footer_fdfars.png",
      confirmButtonText: "Cerrar",

      customClass: {
        title: "custom-title", // Clase personalizada para el título
        image: "custom-image-style",
      },
    });
  };

  const handleTermsConditionsClick = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Términos y Condiciones para Xeven Sensual",
      html: `
      <style>
      .small-text {
        font-size: 10px;
        text-align: justify;
      }
    </style>
    <div class="small-text">
        Al acceder o usar nuestro sitio web <a href=''>https://www.xevensensual.com/</a>, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con estos Términos, no debes usar este sitio web.<br><br>
        1. El uso de este sitio está destinado para todas las personas en general ya que nuestro catálogo ofrece productos para toda la familia.<br><br>
        2. Los precios y la disponibilidad de los productos están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o discontinuar cualquier producto en cualquier momento. No garantizamos que la información del producto sea precisa, completa o actualizada..<br><br>
        3. Al realizar un pedido, te comprometes a proporcionar información exacta y completa. Nos reservamos el derecho de rechazar o cancelar pedidos por cualquier motivo, incluyendo errores en el precio o problemas de pago. El pago se realiza a través de transferecia bancaria, y debes asegurarte de tener fondos suficientes para la transacción.<br><br>
        4. Los tiempos de envío son estimados y pueden variar según la ubicación del destinatario y otros factores. No somos responsables de retrasos fuera de nuestro control. Si el producto no llega dentro del tiempo estimado, contáctanos para asistencia.<br><br>
        5. Ofrecemos un período de devolución de 0 días a partir de la fecha de entrega. Para ser elegible para un reembolso, el producto debe estar en su estado original y en su empaque original. Los reembolsos se procesan a través del mismo método de pago utilizado para la compra.<br><br>
        6. Todo el contenido de este sitio, incluidos textos, imágenes, logotipos y otros materiales, es propiedad de PRANA o de sus licenciantes. No puedes usar, copiar o distribuir este contenido sin nuestro consentimiento por escrito.<br><br>
        7. No seremos responsables de daños indirectos, consecuentes o especiales que resulten del uso o la imposibilidad de usar este sitio o sus productos. Nuestra responsabilidad máxima en cualquier caso se limita al valor total de tu pedido.<br><br>
        8. Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios se publicarán en este sitio, y es tu responsabilidad revisarlos periódicamente.<br><br>
        9. Si tienes preguntas sobre estos Términos, puedes contactarnos a través deL WhatsApp 3025490562.<br><br>
         </div>
`,
      imageUrl:
        "https://res.cloudinary.com/imagesfull/image/upload/v1736204328/MetaStore/Logo-Footer_fdfars.png",
      confirmButtonText: "Cerrar",

      customClass: {
        title: "custom-title", // Clase personalizada para el título
        image: "custom-image-style",
      },
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div
      className={`order-whatsapp-form-container ${
        formVisible ? "visible" : "hidden"
      }`}
    >
      <div className="order-whatsapp-form">
        <h2>Completa tu información</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="title-input">
              Ingresa tu nombre y tu apellido
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ingresa tu nombre completo"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="title-input">
              Ingresa tu número de WhatsApp
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Ingresa tu número de WhatsApp"
              value={formData.phoneNumber}
              onChange={(e) => {
                // Obtener el valor del campo de entrada
                let newValue = e.target.value;
                // Remover todos los caracteres que no sean números
                newValue = newValue.replace(/\D/g, "");
                // Limitar la longitud del número de teléfono a 10 dígitos
                newValue = newValue.slice(0, 10);
                // Actualizar el estado del formulario con el nuevo valor
                setFormData({ ...formData, phoneNumber: newValue });
              }}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="title-input">
              Dirección de residencia
            </label>
            <input
              type="text"
              id="address"
              placeholder="Ingresa la dirección de residencia"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="title-input">
              Ciudad o Municipio
            </label>
            <input
              type="text"
              id="address"
              placeholder="Ingresa el nombre de ciudad o municipio"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="input-field"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="MuiFormControlLabel-root jss24">
              <span
                className="MuiButtonBase-root MuiIconButton-root jss26 MuiCheckbox-root MuiCheckbox-colorPrimary SendOrder_checkbox__K-226 MuiIconButton-colorPrimary"
                aria-disabled="false"
              >
                <span className="MuiIconButton-label">
                  <input
                    className="checkbox-input"
                    name="termsCheck"
                    required=""
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                    data-indeterminate="false"
                    value=""
                  />
                </span>
                <span className="MuiTouchRipple-root"></span>
              </span>
              <span className="MuiTypography-root MuiFormControlLabel-label jss25 MuiTypography-body1">
                <span>
                  He leído y acepto{" "}
                  <span>
                    los{" "}
                    <Link
                      to="#"
                      onClick={handleTermsConditionsClick} // Evento para mostrar la alerta
                      className="My-link"
                    >
                      Términos y Condiciones
                    </Link>{" "}
                    y{" "}
                    <Link
                      to="#"
                      onClick={handlePolicyClick} // Evento para mostrar la alerta
                      className="My-link"
                    >
                      Política de Privacidad{" "}
                    </Link>
                    de PRANA
                  </span>{" "}
                  <span>para el tratamiento de la información.</span>
                </span>
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-black-continue btn-submit"
            disabled={
              !formData.name ||
              !formData.phoneNumber ||
              !formData.city ||
              !formData.address ||
              !termsAccepted ||
              formData.phoneNumber.length !== 10
            }
          >
            <MdWhatsapp className="Icon-whatsapp" />
            Ordenar por WhatsApp
          </button>
        </form>
        <p>
          Volver al <a href="/">carrito</a>
        </p>
      </div>
    </div>
  );
};

export default OrderWhatsAppForm;
