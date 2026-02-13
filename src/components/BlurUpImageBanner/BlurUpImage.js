import { useState } from "react";
import "./BlurUpImage.scss";

const BlurUpImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`blur-up-image-banner ${isLoaded ? "clear" : "blurred"}`} // Cambia la clase según el estado
      onLoad={() => setIsLoaded(true)} // Cambia el estado cuando la imagen está cargada
      loading="lazy" // Carga perezosa para mejorar el rendimiento
    />
  );
};

export default BlurUpImage;
