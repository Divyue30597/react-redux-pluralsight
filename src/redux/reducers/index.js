import { combineReducers } from "redux";
import authorReducer from "./authorReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
});

export default rootReducer;
