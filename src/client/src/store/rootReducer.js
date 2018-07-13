import { combineReducers } from "redux";
import summary from "../reducers/summary";
import auth from "../reducers/auth";

const rootReducer = combineReducers({ summary, auth });
export default rootReducer;
