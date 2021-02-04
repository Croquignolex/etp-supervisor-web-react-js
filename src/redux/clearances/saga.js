import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_CLEARANCE,
    EMIT_CLEARANCES_FETCH,
    storeSetClearancesData,
    storeUpdateClearanceData,
    storeSetNewClearanceData,
    EMIT_ALL_CLEARANCES_FETCH,
    storeSetNextClearancesData,
    EMIT_CLEARANCE_ADD_DECLARE,
    EMIT_NEXT_CLEARANCES_FETCH,
    storeStopInfiniteScrollClearanceData
} from "./actions";
import {
    storeClearancesRequestInit,
    storeClearancesRequestFailed,
    storeAddClearanceRequestInit,
    storeClearancesRequestSucceed,
    storeAllClearancesRequestInit,
    storeAddClearanceRequestFailed,
    storeNextClearancesRequestInit,
    storeAddClearanceRequestSucceed,
    storeAllClearancesRequestFailed,
    storeNextClearancesRequestFailed,
    storeClearanceDeclareRequestInit,
    storeAllClearancesRequestSucceed,
    storeNextClearancesRequestSucceed,
    storeClearanceDeclareRequestSucceed,
    storeClearanceDeclareRequestFailed
} from "../requests/clearances/actions";

// Fetch clearances from API
export function* emitClearancesFetch() {
    yield takeLatest(EMIT_CLEARANCES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeClearancesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.CLEARANCES_API_PATH}?page=1`);
            // Extract data
            const clearances = extractClearancesData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetClearancesData({clearances, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeClearancesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeClearancesRequestFailed({message}));
        }
    });
}

// Fetch next clearances from API
export function* emitNextClearancesFetch() {
    yield takeLatest(EMIT_NEXT_CLEARANCES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextClearancesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.CLEARANCES_API_PATH}?page=${page}`);
            // Extract data
            const clearances = extractClearancesData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetNextClearancesData({clearances, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextClearancesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextClearancesRequestFailed({message}));
            yield put(storeStopInfiniteScrollClearanceData());
        }
    });
}

// Fetch all clearances from API
export function* emitAllClearancesFetch() {
    yield takeLatest(EMIT_ALL_CLEARANCES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllClearancesRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_CLEARANCES_API_PATH);
            // Extract data
            const clearances = extractClearancesData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetClearancesData({clearances, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllClearancesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllClearancesRequestFailed({message}));
        }
    });
}

// New clearance from API
export function* emitAddClearance() {
    yield takeLatest(EMIT_ADD_CLEARANCE, function*({sim, amount, agent}) {
        try {
            // Fire event for request
            yield put(storeAddClearanceRequestInit());
            const data = {id_puce: sim, id_agent: agent, montant: amount};
            const apiResponse = yield call(apiPostRequest, api.NEW_CLEARANCE_API_PATH, data);
            // Extract data
            const clearance = extractClearanceData(
                apiResponse.data.puce,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.demandeur,
                apiResponse.data.demande
            );
            // Fire event to redux
            yield put(storeSetNewClearanceData({clearance}))
            // Fire event for request
            yield put(storeAddClearanceRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddClearanceRequestFailed({message}));
        }
    });
}

// Clearance add declare from API
export function* emitClearanceAddDeclare() {
    yield takeLatest(EMIT_CLEARANCE_ADD_DECLARE, function*({id, amount}) {
        try {
            // Fire event for request
            yield put(storeClearanceDeclareRequestInit());
            const data = {montant: amount};
            const apiResponse = yield call(apiPostRequest, `${api.DECLARE_CLEARANCE_API_PATH}/${id}`, data);
            // Fire event to redux
            yield put(storeUpdateClearanceData({id, amount}));
            // Fire event for request
            yield put(storeClearanceDeclareRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeClearanceDeclareRequestFailed({message}));
        }
    });
}

// Extract clearance data
function extractClearanceData(apiSim, apiUser, apiAgent, apiClaimer, apiFleet) {
    let fleet = {
        id: '', amount: '', status: '', creation: '',

        agent: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
    };

    if(apiAgent && apiUser) {
        fleet.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiSim) {
        fleet.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiClaimer) {
        fleet.claimant = {
            name: apiClaimer.name,
            phone: apiClaimer.phone,
            id: apiClaimer.id.toString(),
        }
    }
    if(apiFleet) {
        fleet.actionLoader = false;
        fleet.status = apiFleet.statut;
        fleet.amount = apiFleet.montant;
        fleet.remaining = apiFleet.reste;
        fleet.id = apiFleet.id.toString();
        fleet.creation = apiFleet.created_at;
    }
    return fleet;
}

// Extract clearances data
function extractClearancesData(apiClearances) {
    const clearances = [];
    if(apiClearances) {
        apiClearances.forEach(data => {
            clearances.push(extractClearanceData(
                data.puce,
                data.user,
                data.agent,
                data.demandeur,
                data.demande
            ));
        });
    }
    return clearances;
}

// Combine to export all functions at once
export default function* sagaClearances() {
    yield all([
        fork(emitAddClearance),
        fork(emitClearancesFetch),
        fork(emitAllClearancesFetch),
        fork(emitClearanceAddDeclare),
        fork(emitNextClearancesFetch),
    ]);
}