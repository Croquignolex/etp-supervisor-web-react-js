import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_SIM,
    EMIT_SIM_FETCH,
    storeSetSimData,
    EMIT_SIMS_FETCH,
    storeSetSimsData,
    storeSetNewSimData,
    EMIT_ALL_SIMS_FETCH,
    EMIT_NEXT_SIMS_FETCH,
    storeSetNextSimsData,
    storeStopInfiniteScrollSimData, EMIT_UPDATE_SIM
} from "./actions";
import {
    storeSimsRequestInit,
    storeSimsRequestFailed,
    storeAddSimRequestInit,
    storeShowSimRequestInit,
    storeSimsRequestSucceed,
    storeAllSimsRequestInit,
    storeNextSimsRequestInit,
    storeAddSimRequestFailed,
    storeShowSimRequestFailed,
    storeAllSimsRequestFailed,
    storeAddSimRequestSucceed,
    storeShowSimRequestSucceed,
    storeNextSimsRequestFailed,
    storeAllSimsRequestSucceed,
    storeNextSimsRequestSucceed, storeEditSimRequestInit, storeEditSimRequestSucceed, storeEditSimRequestFailed
} from "../requests/sims/actions";
import {EMIT_UPDATE_OPERATOR, storeSetOperatorData} from "../operators/actions";
import {
    storeEditOperatorRequestFailed,
    storeEditOperatorRequestInit,
    storeEditOperatorRequestSucceed
} from "../requests/operators/actions";

// Fetch all sims from API
export function* emitAllSimsFetch() {
    yield takeLatest(EMIT_ALL_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_SIMS_API_PATH);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllSimsRequestFailed({message}));
        }
    });
}

// Fetch sims from API
export function* emitSimsFetch() {
    yield takeLatest(EMIT_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimsRequestFailed({message}));
        }
    });
}

// Fetch next sims from API
export function* emitNextSimsFetch() {
    yield takeLatest(EMIT_NEXT_SIMS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SIMS_API_PATH}?page=${page}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSimsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSimData());
        }
    });
}

// Fetch sim from API
export function* emitSimFetch() {
    yield takeLatest(EMIT_SIM_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeShowSimRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SIM_API_PATH}/${id}`);
            // Extract data
            const sim = extractSimData(
                apiResponse.data.puce,
                apiResponse.data.type,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.corporate,
                apiResponse.data.flote,
                apiResponse.data.recouvreur
            );
            // Fire event to redux
            yield put(storeSetSimData({sim}));
            // Fire event for request
            yield put(storeShowSimRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeShowSimRequestFailed({message}));
        }
    });
}

// New sim into API
export function* emitNewSim() {
    yield takeLatest(EMIT_NEW_SIM, function*({name, number, operator, agent, collector, resource,
                                                 reference, description, simType, company}) {
        try {
            // Fire event for request
            yield put(storeAddSimRequestInit());
            // From data
            const data = {
                reference,
                nom: name,
                description,
                type: simType,
                numero: number,
                id_agent: agent,
                id_flotte: operator,
                id_corporate: company,
                id_ressource: resource,
                id_recouvreur: collector,
            }
            // API request
            const apiResponse = yield call(apiPostRequest, api.CREATE_SIM_API_PATH, data);
            // Extract data
            const sim = extractSimData(
                apiResponse.data.puce,
                apiResponse.data.type,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.corporate,
                apiResponse.data.flote,
                apiResponse.data.recouvreur
            );
            // Fire event to redux
            yield put(storeSetNewSimData({sim}));
            // Fire event for request
            yield put(storeAddSimRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddSimRequestFailed({message}));
        }
    });
}

// Update sim info
export function* emitUpdateSim() {
    yield takeLatest(EMIT_UPDATE_SIM, function*({id, name, description}) {
        try {
            // Fire event for request
            yield put(storeEditSimRequestInit());
            const data = {nom: name, description};
            const apiResponse = yield call(apiPostRequest, `${api.EDIT_SIM_API_PATH}/${id}`, data);
            // Extract data
            const sim = extractSimData(
                apiResponse.data.puce,
                apiResponse.data.type,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.corporate,
                apiResponse.data.flote,
                apiResponse.data.recouvreur
            );
            // Fire event to redux
            yield put(storeSetSimData({sim, alsoInList: true}));
            // Fire event for request
            yield put(storeEditSimRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeEditSimRequestFailed({message}));
        }
    });
}

// Extract sim data
function extractSimData(apiSim, apiType, apiUser, apiAgent, apiCompany, apiOperator, apiCollector) {
    let sim = {
        id: '', name: '', reference: '', number: '', balance: '', description: '', creation: '',

        type: {id: '', name: ''},
        agent: {id: '', name: ''},
        company: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''}
    };
    if(apiAgent && apiUser) {
        sim.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiCollector) {
        sim.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiCompany) {
        sim.company = {
            name: apiCompany.nom,
            id: apiCompany.id.toString()
        };
    }
    if(apiOperator) {
        sim.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString()
        };
    }
    if(apiType) {
        sim.type = {
            name: apiType.name,
            id: apiType.id.toString()
        };
    }
    if(apiSim) {
        sim.name = apiSim.nom;
        sim.actionLoader = false;
        sim.number = apiSim.numero;
        sim.balance = apiSim.solde;
        sim.id = apiSim.id.toString();
        sim.creation = apiSim.created_at;
        sim.reference = apiSim.reference;
        sim.description = apiSim.description;
    }
    return sim;
}

// Extract sims data
function extractSimsData(apiSims) {
    const sims = [];
    apiSims.forEach(data => {
        sims.push(extractSimData(
            data.puce,
            data.type,
            data.user,
            data.agent,
            data.corporate,
            data.flote,
            data.recouvreur
        ))
    });
    return sims;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitNewSim),
        fork(emitSimFetch),
        fork(emitUpdateSim),
        fork(emitSimsFetch),
        fork(emitAllSimsFetch),
        fork(emitNextSimsFetch),
    ]);
}