import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reducers from "../Reducers";
const composeEnhancers = composeWithDevTools({});
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
