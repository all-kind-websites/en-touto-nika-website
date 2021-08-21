import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AuthReducer from "./reducers/auth";
import DataReducer from "./reducers/data";
import FiltersReducer from "./reducers/filters";

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  fiters: FiltersReducer
});


const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default configureStore;
