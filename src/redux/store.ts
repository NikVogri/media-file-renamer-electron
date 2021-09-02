import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import fileReducer from './reducers/fileReducer';
import settingsReducer from './reducers/settingsReducer';
import uiReducer from './reducers/uiReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'],
};

const rootReducer = combineReducers({
  file: fileReducer,
  settings: settingsReducer,
  ui: uiReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, logger];

export const store = createStore(
  persistedRootReducer,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
