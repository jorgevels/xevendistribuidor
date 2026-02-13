// actions.js
import { TOGGLE_INSTALL_BUTTON } from "./pwa_types"; // Importa el tipo de acción

export const toggleInstallButton = (isEnabled) => ({
  type: TOGGLE_INSTALL_BUTTON,
  payload: isEnabled,
});
