import {
  OPEN_SIDE_CART,
  CLOSE_SIDE_CART,
  TOGGLE_SIDE_CART,
  TOGGLE_SIDE_BAR,
  CLOSE_SIDEBAR,
  //// WhatsApp
  OPEN_SIDE_CART_WHATSAPP,
  CLOSE_SIDE_CART_WHATSAPP,
  TOGGLE_SIDE_CART_WHATSAPP,
  TOGGLE_SIDE_BAR_WHATSAPP,
  CLOSE_SIDEBAR_WHATSAPP,
} from "./sidebar_types";

export const openSideCart = () => {
  return { type: OPEN_SIDE_CART };
};

export const closeSideCart = () => {
  return { type: CLOSE_SIDE_CART };
};

export const toggleSideCart = () => {
  return { type: TOGGLE_SIDE_CART };
};

export const toggleSidebar = () => {
  return { type: TOGGLE_SIDE_BAR };
};

export const closeSidebar = () => {
  return { type: CLOSE_SIDEBAR };
};

// WHATSAPP

export const openSideCartWhatsApp = () => {
  return { type: OPEN_SIDE_CART_WHATSAPP };
};

export const closeSideCartWhatsApp = () => {
  return { type: CLOSE_SIDE_CART_WHATSAPP };
};

export const toggleSideCartWhatsApp = () => {
  return { type: TOGGLE_SIDE_CART_WHATSAPP };
};

export const toggleSidebarWhatsApp = () => {
  return { type: TOGGLE_SIDE_BAR_WHATSAPP };
};

export const closeSidebarWhatsApp = () => {
  return { type: CLOSE_SIDEBAR_WHATSAPP };
};
