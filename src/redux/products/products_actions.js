import axios from "axios";

import {
  FETCH_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_SINGLE_PRODUCT,
  ADD_NEW_ORDER,
  ADD_TO_BUYER,
} from "./products_types";

const URL = "https://backend-api-xeven-sensual.vercel.app/api/v1/listproducts";

/* const URL = "http://localhost:5000/api/v1/listproducts"; */
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL);
      dispatch({ type: FETCH_PRODUCTS, payload: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (itemID) => {
  return {
    type: ADD_TO_CART,
    payload: itemID,
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const addToBuyer = (itemID) => {
  return {
    type: ADD_TO_BUYER,
    payload: itemID,
  };
};

export const addNewOrder = (itemID) => {
  return {
    type: ADD_NEW_ORDER,
    payload: itemID,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      dispatch({ type: FETCH_SINGLE_PRODUCT, payload: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};
