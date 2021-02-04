import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {SUPPLY_BY_DIGITAL_PARTNER} from "../../constants/typeConstants";
import {apiGetRequest, apiPostRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_AFFORD,
    EMIT_AFFORDS_FETCH,
    storeSetAffordsData,
    storeSetNewAffordData,
    storeSetNextAffordsData,
    EMIT_NEXT_AFFORDS_FETCH,
    storeStopInfiniteScrollAffordData
} from "./actions";
import {
    storeAffordsRequestInit,
    storeAddAffordRequestInit,
    storeAffordsRequestFailed,
    storeAffordsRequestSucceed,
    storeNextAffordsRequestInit,
    storeAddAffordRequestFailed,
    storeAddAffordRequestSucceed,
    storeNextAffordsRequestFailed,
    storeNextAffordsRequestSucceed,
} from "../requests/affords/actions";

// Fetch affords from API
export function* emitAffordsFetch() {
    yield takeLatest(EMIT_AFFORDS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAffordsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.AFFORDS_API_PATH}?page=1`);
            // Extract data
            const affords = extractAffordsData(apiResponse.data.destockages);
            // Fire event to redux
            yield put(storeSetAffordsData({affords, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAffordsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAffordsRequestFailed({message}));
        }
    });
}

// Fetch next affords from API
export function* emitNextAffordsFetch() {
    yield takeLatest(EMIT_NEXT_AFFORDS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextAffordsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.AFFORDS_API_PATH}?page=${page}`);
            // Extract data
            const affords = extractAffordsData(apiResponse.data.destockages);
            // Fire event to redux
            yield put(storeSetNextAffordsData({affords, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextAffordsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextAffordsRequestFailed({message}));
            yield put(storeStopInfiniteScrollAffordData());
        }
    });
}

// Fleets new afford from API
export function* emitAddAfford() {
    yield takeLatest(EMIT_ADD_AFFORD, function*({vendor, amount, sim, receipt}) {
        try {
            // Fire event for request
            yield put(storeAddAffordRequestInit());
            const data = new FormData();
            data.append('id_puce', sim);
            data.append('recu', receipt);
            data.append('montant', amount);
            data.append('fournisseur', vendor);
            data.append('type', SUPPLY_BY_DIGITAL_PARTNER);
            const apiResponse = yield call(apiPostRequest, api.NEW_REFUEL_API_PATH, data);
            // Extract dataF
            const afford = extractAffordData(apiResponse.data);
            // Fire event to redux
            yield put(storeSetNewAffordData({afford}))
            // Fire event for request
            yield put(storeAddAffordRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddAffordRequestFailed({message}));
        }
    });
}

// Extract afford data
function extractAffordData(apiAfford) {
    let afford = {
        id: '', amount: '', creation: '', vendor: '', receipt: '', status: '',

        collector: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
    };

    const apiSim = apiAfford.puce;
    const apiCollector = apiAfford.recouvreur;

    if(apiSim) {
        afford.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiCollector) {
        afford.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiAfford) {
        afford.actionLoader = false;
        afford.status = apiAfford.statut;
        afford.amount = apiAfford.montant;
        afford.id = apiAfford.id.toString();
        afford.vendor = apiAfford.fournisseur;
        afford.creation = apiAfford.created_at;
        afford.receipt = getFileFromServer(apiAfford.recu);
    }
    return afford;
}

// Extract affords data
export function extractAffordsData(apiAffords) {
    const affords = [];
    apiAffords.forEach(data => {
        affords.push(extractAffordData(data));
    });
    return affords;
}

// Combine to export all functions at once
export default function* sagaAffords() {
    yield all([
        fork(emitAddAfford),
        fork(emitAffordsFetch),
        fork(emitNextAffordsFetch),
    ]);
}
