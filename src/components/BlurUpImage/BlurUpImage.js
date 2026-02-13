import { useRef, useState } from "react";
import "./BlurUpImage.scss";

const BlurUpImage = ({ src, alt = "Imagen del producto" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  if (!src || hasError) {
    return (
      <div className="blur-up-image__fallback">
        <p>Imagen no disponible</p>
      </div>
    );
  }

  return (
    <div className="blur-up-image__container" ref={imgRef}>
      <img
        src={src}
        alt={alt}
        className={`blur-up-image ${isLoaded ? "clear" : "blurred"}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default BlurUpImage;
