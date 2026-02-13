// AppContextPW.js
import { createContext, useEffect, useState } from "react";

const AppContextPW = createContext();

export const AppContextPWProvider = ({ children }) => {
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Check if the button was previously shown
    const previouslyShown = localStorage.getItem("showInstallButton");
    if (previouslyShown === "true") {
      setShowInstallButton(true);
    }
  }, []);

  const handleSetShowInstallButton = (value) => {
    setShowInstallButton(value);
    localStorage.setItem("showInstallButton", value ? "true" : "false");
  };

  return (
    <AppContextPW.Provider
      value={{
        showInstallButton,
        setShowInstallButton: handleSetShowInstallButton,
      }}
    >
      {children}
    </AppContextPW.Provider>
  );
};

export default AppContextPW;
