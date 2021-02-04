import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set supplies data
        case actions.STORE_SET_NETWORK_SUPPLIES_DATA:
            nextState = {list: action.networkSupplies, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next supplies data
        case actions.STORE_SET_NEXT_NETWORK_SUPPLIES_DATA:
            nextState = {list: [...state.list, ...action.networkSupplies], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll supplies data
        case actions.STORE_STOP_INFINITE_SCROLL_NETWORK_SUPPLY_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set new supply data
        case actions.STORE_SET_NEW_NETWORK_SUPPLY_DATA:
            nextState = {...state, list: [action.networkSupply, ...state.list]}
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce