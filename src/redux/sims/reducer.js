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
        // Resolve event to set sims data
        case actions.STORE_SET_SIMS_DATA:
            nextState = {...state, list: action.sims, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next sims data
        case actions.STORE_SET_NEXT_SIMS_DATA:
            nextState = {...state, list: [...state.list, ...action.sims], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll sims data
        case actions.STORE_STOP_INFINITE_SCROLL_SIMS_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce