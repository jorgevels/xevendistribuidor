import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BlurUpImage from "../BlurUpImage/BlurUpImage";

import "./Gallery.scss";

const Gallery = ({ gallarey = [], id, image }) => {
  const [sliderKey, setSliderKey] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  const imagesToShow =
    gallarey && gallarey.length > 0
      ? gallarey
      : [{ sku: "default", url: image }];

  // Reiniciar el slider cuando cambia el producto
  useEffect(() => {
    setSliderKey((prev) => prev + 1);
    setImagesLoaded(false);

    const loadImages = imagesToShow.map((img) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = img.url;
        image.onload = resolve;
        image.onerror = resolve;
      });
    });

    Promise.all(loadImages).then(() => {
      setImagesLoaded(true);
    });
  }, [id, image]);

  return (
    <div key={sliderKey} className="gallery-wrapper">
      {imagesLoaded ? (
        <Slider {...settings}>
          {imagesToShow.map((img) => (
            <div className="gallery" key={img.sku}>
              <BlurUpImage src={img.url} alt={img.sku} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="loading-gallery">Cargando imágenes...</div>
      )}
    </div>
  );
};

export default Gallery;
