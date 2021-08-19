import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import fileReducer from './reducers/fileReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  file: fileReducer,
  settings: settingsReducer,
});
const middleware = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
