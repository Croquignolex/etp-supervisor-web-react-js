import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    show: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Supplies
        // Resolve event to set supplies init request store data
        case actions.STORE_SUPPLIES_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set supplies failed request store data
        case actions.STORE_SUPPLIES_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set supplies succeeded request store data
        case actions.STORE_SUPPLIES_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set supplies reset request store data
        case actions.STORE_SUPPLIES_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next supplies
        // Resolve event to set next supplies init request store data
        case actions.STORE_NEXT_SUPPLIES_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next supplies failed request store data
        case actions.STORE_NEXT_SUPPLIES_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next supplies succeeded request store data
        case actions.STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next supplies reset request store data
        case actions.STORE_NEXT_SUPPLIES_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== Show supply
        // Resolve event to set show supply init request store data
        case actions.STORE_SHOW_SUPPLY_REQUEST_INIT:
            nextState = {...state, show: requestInitValue()};
            return nextState || state;
        // Resolve event to set show supply failed request store data
        case actions.STORE_SHOW_SUPPLY_REQUEST_FAILED:
            nextState = {...state, show: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set show supply succeeded request store data
        case actions.STORE_SHOW_SUPPLY_REQUEST_SUCCEEDED:
            nextState = {...state, show: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set show supply reset request store data
        case actions.STORE_SHOW_SUPPLY_REQUEST_RESET:
            nextState = {...state, show: initialState.next};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
