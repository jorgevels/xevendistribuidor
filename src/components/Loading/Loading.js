/* import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loader-container">
      <Loader
        className="loading"
        type="Circles"
        color="#E74C89"
        height={200}
        width={100}
      />
    </div>
  );
};

export default Loading; */

import React from "react";
import "./Loading.scss"; // Asegúrate de tener el archivo CSS

const Loading = () => (
  <div className="loader-container">
    <div className="square-grid">
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
    </div>
  </div>
);

export default Loading;
