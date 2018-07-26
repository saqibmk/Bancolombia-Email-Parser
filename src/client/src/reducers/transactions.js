import {
  SYNCING_TRANSACTIONS,
  DONE_UPDATING_TRANSACTIONS
} from "../actions/transactions";

export default function transaction(state = { fetching: false }, action = {}) {
  switch (action.type) {
    case SYNCING_TRANSACTIONS:
      return {
        ...state,
        fetching: true
      };
    case DONE_UPDATING_TRANSACTIONS:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
}
