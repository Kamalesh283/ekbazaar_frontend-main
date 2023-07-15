import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducers from './reducers/index'
import rootSaga from './sagas'
import { websocketSagas } from './sagas/chat'
import { composeWithDevTools } from '@redux-devtools/extension'
const _IS_DEV_ = process.env.NODE_ENV === "development"
const _IS_PROD_ = process.env.NODE_ENV === "production"
const loggerMiddleware = createLogger({
  predicate: () => _IS_DEV_ || _IS_PROD_,
});
const composeEnhancers = composeWithDevTools({
})
const sagaMiddleware = createSagaMiddleware()

const websocketMiddleware = createSagaMiddleware()

const middleWares = [websocketMiddleware, sagaMiddleware];
// const middleWares = [sagaMiddleware];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleWares, loggerMiddleware))
)
sagaMiddleware.run(rootSaga)

websocketMiddleware.run(websocketSagas);

export default store
