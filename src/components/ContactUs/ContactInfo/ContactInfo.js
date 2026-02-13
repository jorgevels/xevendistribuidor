import React from "react";
import "./ContactInfo.scss";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h4
        className="contact-info__title
      contact-info__title--main mb-5"
      >
        Contact Us
      </h4>
      <h4 className="contact-info__title mb-2">HEADQUARTERS</h4>
      <p className="contact-info__text mb-4">
        Medellin Antioquia sector centro
      </p>
      <h4 className="contact-info__title mb-2">Telefono</h4>
      <p className="contact-info__text mb-4">321 720 9185</p>
      <h4 className="contact-info__title mb-2">support</h4>
      <p className="contact-info__text mb-4">
        support@metastore.com
        <br />
        help@metastore.com
        <br />
        XXX
      </p>
    </div>
  );
};

export default ContactInfo;
