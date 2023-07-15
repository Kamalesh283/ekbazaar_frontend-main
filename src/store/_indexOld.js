import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers/_indexOld'
import rootSaga from './sagas';
import history from '../Routes/history'

import storageSession from 'redux-persist/lib/storage/session'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import crossBrowserListener from '../utils/cross-browser-middleware'

const sagaMiddleware = createSagaMiddleware();
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);
const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
let _DEV_ = process.env.NODE_ENV == 'developement';
const persistConfig = {
    key: 'root',
    storage: storageSession,
    stateReconciler: hardSet
}
export const reducer = persistReducer(persistConfig, rootReducer(history))

export default function configureStore(initialState = {}, history) {
    // const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    middlewares.push(loggerMiddleware);

    const enhancers = [
        applyMiddleware(...middlewares),
    ].concat(_DEV_ ? devtools() : []);

    const store = createStore(
        reducer,
        initialState,
        compose(...enhancers)
    );

    // Create hook for async sagas
    store.runSaga = sagaMiddleware.run(rootSaga);

    const _persistStore = persistStore(store);
    window.addEventListener('storage', crossBrowserListener(store, persistConfig))
    return {store, _persistStore};
}
