import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "../reducers";
import { verifyRequest } from "../actions/auth";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { rootSaga } from "../actions/saga/root";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  store.dispatch(verifyRequest());
  return store;
}

export const store = configureStore();
