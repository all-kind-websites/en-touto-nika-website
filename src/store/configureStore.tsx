import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import AuthReducer from "./reducers/auth";
import DataReducer from "./reducers/data";
import FiltersReducer from "./reducers/filters";
import GeneralReducer from "./reducers/game";

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  fliters: FiltersReducer,
  game: GeneralReducer
});

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


export default configureStore;
