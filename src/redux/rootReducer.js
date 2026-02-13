import React from "react";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productsReducer from "./products/products_reducers";
import sidebarReducer from "./sidebar/sidebar_reducers";
import pwaReducer from "./Pwa/pwa_reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["sidebar"],
};

const rootReducer = combineReducers({
  pwa: pwaReducer,
  products: productsReducer,
  sidebar: sidebarReducer,
});

export default persistReducer(persistConfig, rootReducer);
