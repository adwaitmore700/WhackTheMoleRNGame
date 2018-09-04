import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import pReducer from "./reducer";
import { persistStore } from "redux-persist";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
});

export const pStore = createStore(
  pReducer,
  compose(applyMiddleware(loggerMiddleware))
);

export const persistor = persistStore(pStore);
