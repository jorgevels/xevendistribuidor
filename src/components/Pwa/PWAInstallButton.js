import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import "./PWAInstallButton.scss";

function PWAInstallButtonK() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("Evento beforeinstallprompt activado");
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is already installed
    window.addEventListener("appinstalled", () => {
      console.log("App installed");
      setShowInstallButton(false);
    });

    // Check if the button was previously shown
    const previouslyShown = localStorage.getItem("showInstallButton");
    if (previouslyShown === "true") {
      setShowInstallButton(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuario aceptó la instalación");
          setShowInstallButton(false);
          localStorage.removeItem("showInstallButton");
        } else {
          console.log("Usuario canceló la instalación");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      {showInstallButton && (
        <button className={`install-button `} onClick={handleInstallClick}>
          <MdDownloadForOffline className="Button_icon" />
        </button>
      )}
    </div>
  );
}

export default PWAInstallButtonK;
