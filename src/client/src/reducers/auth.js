import initialState from "./initialState";
import {
  SHOW_AUTH_ALERT,
  HIDE_AUTH_ALERT,
  START_AUTH,
  AUTH_FAILED,
  AUTH_SUCCESS
} from "../actions/auth";

export default function auth(
  state = { authReq: false, authenticating: false },
  action = {}
) {
  switch (action.type) {
    case SHOW_AUTH_ALERT:
      return {
        ...state,
        authReq: true
      };
    case HIDE_AUTH_ALERT:
      return {
        ...state,
        authReq: false
      };
    case START_AUTH:
      return {
        ...state,
        authenticating: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authReq: false,
        authenticating: false
      };
    case AUTH_FAILED:
      return {
        ...state,
        authenticating: false,
        authReq: true
      };
    default:
      return state;
  }
}
