import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { NODE_ENV } = publicRuntimeConfig;

let usedMiddlewares = [];

if (NODE_ENV !== "production") {
  // some redux dev middlewares
  // redux logger, available on browser console
  const { createLogger } = require("redux-logger");
  const loggerMiddleware = createLogger({});
  usedMiddlewares.push(loggerMiddleware);
}

const Middlewares = applyMiddleware(...usedMiddlewares);

// root of store, store initialized here
const initializeStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, Middlewares);
};

export default initializeStore;
