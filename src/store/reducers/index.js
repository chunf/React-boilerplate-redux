import { combineReducers } from "redux";
import ReducerExample from "./ReducerExample";
import locale from "./Lang";
import User from "./User";

export default combineReducers({
  User,
  locale,
  ReducerExample,
});
