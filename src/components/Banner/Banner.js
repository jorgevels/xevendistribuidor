import BlurUpImage from "../BlurUpImageBanner/BlurUpImage";
import "./Banner.scss";

const Banner = ({ image }) => {
  return (
    <div className="product-banner">
      <BlurUpImage
        src={image}
        alt="Banner image"
        className="blur-up-image-banner"
      />
    </div>
  );
};

export default Banner;
