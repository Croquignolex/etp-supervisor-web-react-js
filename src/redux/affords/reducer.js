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
        // Resolve event to set affords data
        case actions.STORE_SET_AFFORDS_DATA:
            nextState = {list: action.affords, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next affords data
        case actions.STORE_SET_NEXT_AFFORDS_DATA:
            nextState = {list: [...state.list, ...action.affords], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll affords data
        case actions.STORE_STOP_INFINITE_SCROLL_AFFORD_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        case actions.STORE_SET_NEW_AFFORD_DATA:
            nextState = {...state, list: [action.afford, ...state.list]}
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce