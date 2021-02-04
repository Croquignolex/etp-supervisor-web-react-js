import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    add: {failed: false, loading: false, succeeded: false, message: ""},
    all: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    declare: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Clearances
        // Resolve event to set clearances init request store data
        case actions.STORE_CLEARANCES_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set clearances failed request store data
        case actions.STORE_CLEARANCES_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set clearances succeeded request store data
        case actions.STORE_CLEARANCES_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set clearances reset request store data
        case actions.STORE_CLEARANCES_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next clearances
        // Resolve event to set next clearances init request store data
        case actions.STORE_NEXT_CLEARANCES_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next clearances failed request store data
        case actions.STORE_NEXT_CLEARANCES_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next clearances succeeded request store data
        case actions.STORE_NEXT_CLEARANCES_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next clearances reset request store data
        case actions.STORE_NEXT_CLEARANCES_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== All clearances
        // Resolve event to set all clearances init request store data
        case actions.STORE_ALL_CLEARANCES_REQUEST_INIT:
            nextState = {...state, all: requestInitValue()};
            return nextState || state;
        // Resolve event to set all clearances failed request store data
        case actions.STORE_ALL_CLEARANCES_REQUEST_FAILED:
            nextState = {...state, all: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all clearances succeeded request store data
        case actions.STORE_ALL_CLEARANCES_REQUEST_SUCCEEDED:
            nextState = {...state, all: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all clearances reset request store data
        case actions.STORE_ALL_CLEARANCES_REQUEST_RESET:
            nextState = {...state, all: initialState.all};
            return nextState || state;
        // ======================================================== Add clearance
        // Resolve event to set add clearance init request store data
        case actions.STORE_ADD_CLEARANCE_REQUEST_INIT:
            nextState = {...state, add: requestInitValue()};
            return nextState || state;
        // Resolve event to set add clearance failed request store data
        case actions.STORE_ADD_CLEARANCE_REQUEST_FAILED:
            nextState = {...state, add: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set add clearance succeeded request store data
        case actions.STORE_ADD_CLEARANCE_REQUEST_SUCCEEDED:
            nextState = {...state, add: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set add clearance reset request store data
        case actions.STORE_ADD_CLEARANCE_REQUEST_RESET:
            nextState = {...state, add: initialState.add};
            return nextState || state;
        // ======================================================== Clearance declare
        // Resolve event to set clearance declare init request store data
        case actions.STORE_CLEARANCE_DECLARE_REQUEST_INIT:
            nextState = {...state, declare: requestInitValue()};
            return nextState || state;
        // Resolve event to set clearance declare failed request store data
        case actions.STORE_CLEARANCE_DECLARE_REQUEST_FAILED:
            nextState = {...state, declare: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set clearance declare succeeded request store data
        case actions.STORE_CLEARANCE_DECLARE_REQUEST_SUCCEEDED:
            nextState = {...state, declare: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set clearance declare reset request store data
        case actions.STORE_CLEARANCE_DECLARE_REQUEST_RESET:
            nextState = {...state, declare: initialState.declare};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
