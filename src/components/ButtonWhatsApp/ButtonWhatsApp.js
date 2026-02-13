import { FloatingWhatsApp } from "react-floating-whatsapp";
import "./ButtonWhatsApp.scss";

const ButtonWhatsApp = ({ showButton }) => {
  // Arreglo de números de teléfono disponibles "573103413261"
  const phoneNumbers = [/* "573215299643", */ "573236641535"];

  const phoneNumberToName = {
    /* 573215299643: "Lina", */
    573236641535: "Jorge",
  };

  // Mapeo de números de teléfono a avatares específicos
  const phoneNumberToAvatar = {
    573236641535:
      "https://res.cloudinary.com/imagesfull/image/upload/v1714492181/MetaStore/Jorge_mocomd.jpg",
  };

  const randomPhoneNumber =
    phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];

  // Encuentra el nombre y el avatar asociados con el número seleccionado
  const accountName = `Mi nombre es ${phoneNumberToName[randomPhoneNumber]}`;
  const avatarURL = phoneNumberToAvatar[randomPhoneNumber];

  return showButton ? (
    <FloatingWhatsApp
      accountName={accountName} // Usa el nombre correspondiente
      chatboxHeight={320}
      chatboxClassName="floating-whatsapp-chatbox"
      statusMessage="No tardamos en responder"
      chatMessage="Bienvenid@ a Xeven Sensual! 🤝es un gusto atenderle, en que te puedo ayudar?"
      phoneNumber={randomPhoneNumber} // Usa el número aleatorio
      notification={true}
      notificationDelay={5}
      notificationLoop={0}
      notificationSound={false}
      notificationClassName="floating-whatsapp-notification"
      buttonClassName="floating-whatsapp-button"
      placeholder="Escribe un mensaje.."
      messageDelay={2}
      avatar={avatarURL}
    />
  ) : null;
};

export default ButtonWhatsApp;
