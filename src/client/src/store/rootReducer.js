import { combineReducers } from "redux";
import summary from "../reducers/summary";
import auth from "../reducers/auth";
import transactions from "../reducers/transactions";

const rootReducer = combineReducers({ summary, auth, transactions });
export default rootReducer;
