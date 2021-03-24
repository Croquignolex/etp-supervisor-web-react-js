import * as actions from "./actions";
import Lodash from "lodash";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false,

    current: {
        id: '', amount: '', creation: '', remaining: '', status: '',

        agent: {id: '', name: ''},
        supplier: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},


        returns: [],
        recoveries: []
    },
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set supplies data
        case actions.STORE_SET_SUPPLIES_DATA:
            nextState = {list: action.supplies, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set supply data
        case actions.STORE_SET_SUPPLY_DATA:
            nextState = {...state, current: action.supply};
            if(action.alsoInList) {
                nextState = {
                    ...nextState,
                    list: Lodash.map(nextState.list, (item) => {
                        if(item.id === action.supply.id) item = action.supply;
                        return item;
                    })
                };
            }
            return nextState || state;
        // Resolve event to set next supplies data
        case actions.STORE_SET_NEXT_SUPPLIES_DATA:
            nextState = {list: [...state.list, ...action.supplies], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll supplies data
        case actions.STORE_STOP_INFINITE_SCROLL_SUPPLY_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce