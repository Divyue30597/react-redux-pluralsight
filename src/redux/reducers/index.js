import { combineReducers } from "redux";
import authorReducer from "./authorReducer";
import courseReducer from "./courseReducer";
import apiCallStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallStatus: apiCallStatusReducer,
});

export default rootReducer;
