import { TOGGLE_INSTALL_BUTTON } from "./pwa_types"; // Importa el tipo de acción

// Acción para cambiar el estado del botón de instalación de la PWA
export const toggleInstallButton = (isEnabled) => ({
  type: TOGGLE_INSTALL_BUTTON,
  payload: isEnabled,
});

// Reducer para manejar el estado del botón de instalación de la PWA
const initialState = {
  installButtonEnabled: false,
};

const pwaReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_INSTALL_BUTTON:
      return {
        ...state,
        installButtonEnabled: action.payload,
      };
    default:
      return state;
  }
};

export default pwaReducer;
