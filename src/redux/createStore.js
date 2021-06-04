import { applyMiddleware, createStore } from "redux";
import createSagaMiddle from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from "redux-logger";
import thunk from 'redux-thunk'

import { persistStore } from 'redux-persist'

import rootReducer from "./rootReducer";
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddle()

export const middlewares = [thunk, sagaMiddleware, logger]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default {
  store,
  persistor,
}

