// Reducer action types
import {STORE_SET_NEW_OPERATOR_DATA} from "../operators/actions";

export const STORE_SET_SIM_DATA = 'STORE_SET_SIM_DATA';
export const STORE_SET_SIMS_DATA = 'STORE_SET_SIMS_DATA';
export const STORE_SET_NEW_SIM_DATA = 'STORE_SET_NEW_SIM_DATA';
export const STORE_SET_NEXT_SIMS_DATA = 'STORE_SET_NEXT_SIMS_DATA';
export const STORE_SET_SIM_ACTION_DATA = 'STORE_SET_SIM_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_SIMS_DATA = 'STORE_STOP_INFINITE_SCROLL_SIMS_DATA';

// Middleware action types
export const EMIT_NEW_SIM = 'EMIT_NEW_SIM';
export const EMIT_SIM_FETCH = 'EMIT_SIM_FETCH';
export const EMIT_UPDATE_SIM = 'EMIT_UPDATE_SIM';
export const EMIT_SIMS_FETCH = 'EMIT_SIMS_FETCH';
export const EMIT_ALL_SIMS_FETCH = 'EMIT_ALL_SIMS_FETCH';
export const EMIT_NEXT_SIMS_FETCH = 'EMIT_NEXT_SIMS_FETCH';

//====================== Reducer trigger actions
// Set sims data in store
export const storeSetSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_SIMS_DATA
});

// Set sim data in store
export const storeSetSimData = ({sim, alsoInList = false}) => ({
    sim,
    alsoInList,
    type: STORE_SET_SIM_DATA
});

// Set next sims data in store
export const storeSetNextSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_NEXT_SIMS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollSimData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_SIMS_DATA
});

// Set new sim data in store
export const storeSetNewSimData = ({sim}) => ({
    sim,
    type: STORE_SET_NEW_SIM_DATA
});

//====================== Middleware trigger actions
// Emit sims fetch
export const emitSimsFetch = () => ({
    type: EMIT_SIMS_FETCH
});

// Emit next sims fetch
export const emitNextSimsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_SIMS_FETCH
});

// Emit all sims fetch
export const emitAllSimsFetch = () => ({
    type: EMIT_ALL_SIMS_FETCH
});

// Emit sim fetch
export const emitSimFetch = ({id}) => ({
    id,
    type: EMIT_SIM_FETCH
});

// Emit new sim
export const emitNewSim = ({name, simType, number, operator, agent, resource,
                               reference, description, company, collector}) => ({
    name,
    agent,
    number,
    company,
    simType,
    resource,
    operator,
    reference,
    collector,
    description,
    type: EMIT_NEW_SIM
});

// Emit update sim
export const emitUpdateSim = ({id, name, description}) => ({
    id,
    name,
    description,
    type: EMIT_UPDATE_SIM
});