import "bootstrap/dist/css/bootstrap-grid.min.css";
import React from "react";
import ReactDOM from "react-dom/client"; // Cambiar a react-dom/client
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { AuthProvider } from "../src/context/AuthContext";
import { SearchProvider } from "../src/context/SearchContext"; // 👈 importar el SearchProvider

import "./index.scss";
import App from "./Routes/App";
import registerServiceWorker from "./serviceWorkerRegistration";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

// Usar createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SearchProvider>
            <App />
          </SearchProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

registerServiceWorker();
