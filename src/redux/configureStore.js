import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add supports for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    // reduxImmutableStateInvariant will tell us if we have accidentally mutated the original state. it acts as a safety net for us.
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
