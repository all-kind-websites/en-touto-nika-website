import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import AuthReducer from "./reducers/auth";
import DataReducer from "./reducers/data";
import FiltersReducer from "./reducers/filters";
import GeneralReducer from "./reducers/game";
import { LOG_OUT } from "./actions/auth";

const appReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  fliters: FiltersReducer,
  game: GeneralReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT) {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const configureStore = () => {
  let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  let persistor = persistStore(store)
  return { store, persistor }
};


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const { store, persistor } = configureStore();

export default configureStore;
