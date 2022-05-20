import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { shopReducers } from "../reducers";

const composeEnhancers = composeWithDevTools({});
const store = createStore(
   shopReducers,
   composeEnhancers(applyMiddleware(thunk))
);
export default store;
