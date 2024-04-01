import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';

import reactotron from './helpers/reactotron';
import createReducer from './reducers';
import rootSaga from './sagas';
import { setStore } from './store';

export default function configureAppStore() {
  const sagaMonitor = reactotron.createSagaMonitor();
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    enhancers: [
      createInjectorsEnhancer({
        createReducer,
        runSaga: sagaMiddleware.run,
      }),
      reactotron.createEnhancer(),
    ],
  });
  const persistor = persistStore(store);

  setStore(store);

  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(routinePromiseWatcherSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return { store, persistor };
}
