/** @module rdux_store */

import ethAdapter from "eth-adapter";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "redux/reducers";

/** The middleware application of redux-thunk */
const middleware = applyMiddleware(thunk);

/**
 * The redux store applied with thunk-middleware
 */
const store = createStore(rootReducer, composeWithDevTools(middleware));

// Set the state equalizer to the ethAdapter instance
ethAdapter.setEqualizeFunction(() => store.dispatch({ type: "ethAdapter/equalize" }));

export default store;
