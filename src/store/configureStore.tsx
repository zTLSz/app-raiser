import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers'
//import { verifyAuth } from "../actions/auth";
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { rootSaga } from '../actions/saga/root'

const sagaMiddleware = createSagaMiddleware()


export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware)
  );
  // store.dispatch(verifyAuth());
  sagaMiddleware.run(rootSaga);
  return store;
}



export const store = configureStore()