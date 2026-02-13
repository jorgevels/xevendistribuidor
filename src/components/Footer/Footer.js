import { contactInfo } from "../../utils/footerInfo";

import paymentLogoDavip from "../../assets/images/Daviplata.png";
import paymentLogoEfecty from "../../assets/images/Efecty.jpeg";
import footerLogo from "../../assets/images/Logo-Footer.png";
import paymentLogoMaster from "../../assets/images/master-card@2x.png";
import paymentLogoNequi from "../../assets/images/Nequi.png";
import paymentLogoPse from "../../assets/images/Pse.jpeg";
import paymentLogoVisa from "../../assets/images/visa-white.png";
import SocialIcons from "../SocialIcons/SocialIcons";

import "./Footer2.scss";

const Footer = () => {
  return (
    <section className="site-footer py-5">
      <div className="container">
        <div className="site-footer__header">
          {/* Logo */}
          <div className="site-footer__header-logo-container">
            <img
              src={footerLogo}
              alt="footer logo"
              className="site-footer__logo"
            />
          </div>

          {/* Payment Information */}
          <div className="site-footer__header-payment-info">
            <h5 className="site-footer__header-payment-info__title">
              Pague con seguridad
            </h5>
            <h5 className="site-footer__header-payment-info__subtitle">
              Diferentes canales de pago
            </h5>
            <div className="site-footer__header-payment-info__payments">
              <img src={paymentLogoVisa} alt="Visa" />
              <img src={paymentLogoMaster} alt="MasterCard" />
              <img src={paymentLogoDavip} alt="Daviplata" />
              <img src={paymentLogoNequi} alt="Nequi" />
              <img src={paymentLogoPse} alt="PSE" />
              <img src={paymentLogoEfecty} alt="Efecty" />
            </div>
          </div>

          {/* Subscription Form */}
          <div className="site-footer__header-form-container">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="site-footer__form"
            >
              <input
                type="email"
                className="site-footer__input"
                placeholder="Tu email..."
              />
              <input
                type="submit"
                className="site-footer__btn"
                value="Subscríbete"
              />
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="site-footer__contact">
          <h5 className="site-footer__contact-content-title">
            INFORMACIÓN DE CONTACTO
          </h5>
          {contactInfo.map((item) => {
            const { id, text } = item;
            return (
              <p className="site-footer__contact-content-text" key={id}>
                <span>{text}</span>
              </p>
            );
          })}
        </div>

        {/* Footer Bottom */}
        <div className="site-footer__footer">
          <div className="site-footer__footer-rights">
            <span>
              <span className="site-footer__rights--author">
                xevensensual.com
              </span>{" "}
              &copy; {new Date().getFullYear()}. Todos los derechos reservados
            </span>
          </div>
          <div className="site-footer__footer-social">
            <SocialIcons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
