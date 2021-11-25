import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    all: {failed: false, loading: false, succeeded: false, message: ""},
    add: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    show: {failed: false, loading: false, succeeded: false, message: ""},
    edit: {failed: false, loading: false, succeeded: false, message: ""},
    status: {failed: false, loading: false, succeeded: false, message: ""}
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Resources
        // Resolve event to set resources init request store data
        case actions.STORE_RESOURCES_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set resources failed request store data
        case actions.STORE_RESOURCES_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set resources succeeded request store data
        case actions.STORE_RESOURCES_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set resources reset request store data
        case actions.STORE_RESOURCES_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next resources
        // Resolve event to set next resources init request store data
        case actions.STORE_NEXT_RESOURCES_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next resources failed request store data
        case actions.STORE_NEXT_RESOURCES_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next resources succeeded request store data
        case actions.STORE_NEXT_RESOURCES_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next resources reset request store data
        case actions.STORE_NEXT_RESOURCES_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== All resources
        // Resolve event to set all resources init request store data
        case actions.STORE_ALL_RESOURCES_REQUEST_INIT:
            nextState = {...state, all: requestInitValue()};
            return nextState || state;
        // Resolve event to set all resources failed request store data
        case actions.STORE_ALL_RESOURCES_REQUEST_FAILED:
            nextState = {...state, all: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all resources succeeded request store data
        case actions.STORE_ALL_RESOURCES_REQUEST_SUCCEEDED:
            nextState = {...state, all: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all resources reset request store data
        case actions.STORE_ALL_RESOURCES_REQUEST_RESET:
            nextState = {...state, all: initialState.all};
            return nextState || state;
        // ======================================================== Add resource
        // Resolve event to set add resource init request store data
        case actions.STORE_ADD_RESOURCE_REQUEST_INIT:
            nextState = {...state, add: requestInitValue()};
            return nextState || state;
        // Resolve event to set add resource failed request store data
        case actions.STORE_ADD_RESOURCE_REQUEST_FAILED:
            nextState = {...state, add: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set add resource succeeded request store data
        case actions.STORE_ADD_RESOURCE_REQUEST_SUCCEEDED:
            nextState = {...state, add: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set add resource reset request store data
        case actions.STORE_ADD_RESOURCE_REQUEST_RESET:
            nextState = {...state, add: initialState.add};
            return nextState || state;
        // ======================================================== Resource
        // Resolve event to set resource init request store data
        case actions.STORE_RESOURCE_REQUEST_INIT:
            nextState = {...state, show: requestInitValue()};
            return nextState || state;
        // Resolve event to set resource failed request store data
        case actions.STORE_RESOURCE_REQUEST_FAILED:
            nextState = {...state, show: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set resource succeeded request store data
        case actions.STORE_RESOURCE_REQUEST_SUCCEEDED:
            nextState = {...state, show: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set resource reset request store data
        case actions.STORE_RESOURCE_REQUEST_RESET:
            nextState = {...state, show: initialState.show};
            return nextState || state;
        // ======================================================== Resource status toggle
        // Resolve event to set resource status toggle init request store data
        case actions.STORE_RESOURCE_STATUS_TOGGLE_REQUEST_INIT:
            nextState = {...state, status: requestInitValue()};
            return nextState || state;
        // Resolve event to set resource status toggle failed request store data
        case actions.STORE_RESOURCE_STATUS_TOGGLE_REQUEST_FAILED:
            nextState = {...state, status: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set resource status toggle succeeded request store data
        case actions.STORE_RESOURCE_STATUS_TOGGLE_REQUEST_SUCCEEDED:
            nextState = {...state, status: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set resource status toggle reset request store data
        case actions.STORE_RESOURCE_STATUS_TOGGLE_REQUEST_RESET:
            nextState = {...state, status: initialState.status};
            return nextState || state;
        // ======================================================== Resource edit info
        // Resolve event to set resource edit info init request store data
        case actions.STORE_RESOURCE_EDIT_INFO_REQUEST_INIT:
            nextState = {...state, edit: requestInitValue()};
            return nextState || state;
        // Resolve event to set resource edit info failed request store data
        case actions.STORE_RESOURCE_EDIT_INFO_REQUEST_FAILED:
            nextState = {...state, edit: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set resource edit info succeeded request store data
        case actions.STORE_RESOURCE_EDIT_INFO_REQUEST_SUCCEEDED:
            nextState = {...state, edit: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set resource edit info reset request store data
        case actions.STORE_RESOURCE_EDIT_INFO_REQUEST_RESET:
            nextState = {...state, edit: initialState.edit};
            return nextState || state;

        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
