import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    add: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: true, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    apply: {failed: false, loading: false, succeeded: false, message: ""},
    cancel: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Payment
        // Resolve event to set transfers init request store data
        case actions.STORE_TRANSFERS_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set transfers failed request store data
        case actions.STORE_TRANSFERS_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set transfers succeeded request store data
        case actions.STORE_TRANSFERS_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set transfers reset request store data
        case actions.STORE_TRANSFERS_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next transfers
        // Resolve event to set next transfers init request store data
        case actions.STORE_NEXT_TRANSFERS_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next transfers failed request store data
        case actions.STORE_NEXT_TRANSFERS_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next transfers succeeded request store data
        case actions.STORE_NEXT_TRANSFERS_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next transfers reset request store data
        case actions.STORE_NEXT_TRANSFERS_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== Add transfer
        // Resolve event to set add transfer init request store data
        case actions.STORE_ADD_TRANSFER_REQUEST_INIT:
            nextState = {...state, add: requestInitValue()};
            return nextState || state;
        // Resolve event to set add transfer failed request store data
        case actions.STORE_ADD_TRANSFER_REQUEST_FAILED:
            nextState = {...state, add: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set add transfer succeeded request store data
        case actions.STORE_ADD_TRANSFER_REQUEST_SUCCEEDED:
            nextState = {...state, add: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set add transfer reset request store data
        case actions.STORE_ADD_TRANSFER_REQUEST_RESET:
            nextState = {...state, add: initialState.add};
            return nextState || state;
        // ======================================================== Confirm transfer
        // Resolve event to set confirm transfer init request store data
        case actions.STORE_CONFIRM_TRANSFER_REQUEST_INIT:
            nextState = {...state, apply: requestInitValue()};
            return nextState || state;
        // Resolve event to set confirm transfer failed request store data
        case actions.STORE_CONFIRM_TRANSFER_REQUEST_FAILED:
            nextState = {...state, apply: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm transfer succeeded request store data
        case actions.STORE_CONFIRM_TRANSFER_REQUEST_SUCCEEDED:
            nextState = {...state, apply: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm transfer reset request store data
        case actions.STORE_CONFIRM_TRANSFER_REQUEST_RESET:
            nextState = {...state, apply: initialState.apply};
            return nextState || state;
        // ======================================================== Cancel transfer
        // Resolve event to set cancel transfer init request store data
        case actions.STORE_CANCEL_TRANSFER_REQUEST_INIT:
            nextState = {...state, cancel: requestInitValue()};
            return nextState || state;
        // Resolve event to set cancel transfer failed request store data
        case actions.STORE_CANCEL_TRANSFER_REQUEST_FAILED:
            nextState = {...state, cancel: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set cancel transfer succeeded request store data
        case actions.STORE_CANCEL_TRANSFER_REQUEST_SUCCEEDED:
            nextState = {...state, cancel: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set cancel transfer reset request store data
        case actions.STORE_CANCEL_TRANSFER_REQUEST_RESET:
            nextState = {...state, cancel: initialState.cancel};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
