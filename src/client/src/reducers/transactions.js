import {
  SYNCING_TRANSACTIONS,
  DONE_SYNCING_TRANSACTIONS,
  ERROR_SYNCING_TRANSACTIONS,
  NO_NEW_TRANSACTIONS,
  UPDATE_LAST_SYNC_RUN
} from "../actions/transactions";

export default function transaction(
  state = { fetching: false, error: false },
  action = {}
) {
  switch (action.type) {
    case SYNCING_TRANSACTIONS:
      return {
        ...state,
        fetching: true
      };
    case DONE_SYNCING_TRANSACTIONS:
      return {
        ...state,
        fetching: false,
        error: false,
        newTransactions: action.data.newTransactions,
        lastRun: action.data.lastRun
      };
    case ERROR_SYNCING_TRANSACTIONS:
      return {
        ...state,
        fetching: false,
        error: true
      };
    case NO_NEW_TRANSACTIONS:
      return {
        ...state,
        newTransactions: 0
      };
    case UPDATE_LAST_SYNC_RUN:
      return {
        ...state,
        lastRun: action.data
      };
    default:
      return state;
  }
}
