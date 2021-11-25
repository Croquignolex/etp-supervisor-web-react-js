import Lodash from "lodash";

import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false,

    current: {
        description: '', phone: '', email: '', creation: '',
        id: '', name: '', address: '', avatar: '', status: '',

        creator: {id: '', name: ''},
        account: {id: '', balance: ''},
    },
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set resources data
        case actions.STORE_SET_RESOURCES_DATA:
            nextState = {...state, list: action.resources, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set resource data
        case actions.STORE_SET_RESOURCE_DATA:
            nextState = {...state, current: action.resource};
            if(action.alsoInList) {
                nextState = {
                    ...nextState,
                    list: Lodash.map(nextState.list, (item) => {
                        if(item.id === action.resource.id) item = action.resource;
                        return item;
                    })
                };
            }
            return nextState || state;
        // Resolve event to set new resource data
        case actions.STORE_SET_NEW_RESOURCE_DATA:
            nextState = {...state, list: [action.resource, ...state.list]}
            return nextState || state;
        // Resolve event to set next resources data
        case actions.STORE_SET_NEXT_RESOURCES_DATA:
            nextState = {...state, list: [...state.list, ...action.resources], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll resources data,
        case actions.STORE_STOP_INFINITE_SCROLL_RESOURCES_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to toggle resource status data,
        case actions.STORE_SET_RESOURCE_TOGGLE_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) item.status = !item.status;
                    return item;
                })
            };
            return nextState || state;
        // Resolve event to set sim action data
        case actions.STORE_SET_RESOURCE_ACTION_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) item.actionLoader = !item.actionLoader;
                    return item;
                })
            };
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
