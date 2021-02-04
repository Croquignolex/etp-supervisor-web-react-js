import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {
    EMIT_SUPPLIES_FETCH,
    storeSetSuppliesData,
    storeSetNextSuppliesData,
    EMIT_NEXT_SUPPLIES_FETCH,
    storeStopInfiniteScrollSupplyData
} from "./actions";
import {
    storeSuppliesRequestInit,
    storeSuppliesRequestFailed,
    storeSuppliesRequestSucceed,
    storeNextSuppliesRequestInit,
    storeNextSuppliesRequestFailed,
    storeNextSuppliesRequestSucceed
} from "../requests/supplies/actions";

// Fetch supplies from API
export function* emitSuppliesFetch() {
    yield takeLatest(EMIT_SUPPLIES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPPLIES_API_PATH}?page=1`);
            // Extract data
            const supplies = extractSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetSuppliesData({supplies, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSuppliesRequestFailed({message}));
        }
    });
}

// Fetch next supplies from API
export function* emitNextSuppliesFetch() {
    yield takeLatest(EMIT_NEXT_SUPPLIES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPPLIES_API_PATH}?page=${page}`);
            // Extract data
            const supplies = extractSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextSuppliesData({supplies, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSuppliesRequestFailed({message}));
            yield put(storeStopInfiniteScrollSupplyData());
        }
    });
}

// Extract supply data
function extractSupplyData(apiSimOutgoing, apiSimIncoming, apiUser, apiAgent, apiSupplier, apiSupply) {
    let supply = {
        id: '', amount: '', creation: '', remaining: '', status: '',

        request: {id: ''},
        agent: {id: '', name: ''},
        supplier: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        supply.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiSimOutgoing) {
        supply.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        supply.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiSupplier) {
        supply.supplier = {
            name: apiSupplier.name,
            id: apiSupplier.id.toString()
        };
    }
    if(apiSupply) {
        supply.actionLoader = false;
        supply.status = apiSupply.statut;
        supply.amount = apiSupply.montant;
        supply.remaining = apiSupply.reste;
        supply.id = apiSupply.id.toString();
        supply.creation = apiSupply.created_at;
    }
    return supply;
}

// Extract supplies data
export function extractSuppliesData(apiSupplies) {
    const supplies = [];
    apiSupplies.forEach(data => {
        supplies.push(extractSupplyData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.user,
            data.agent,
            data.gestionnaire,
            data.approvisionnement,
        ));
    });
    return supplies;
}

// Combine to export all functions at once
export default function* sagaSupplies() {
    yield all([
        fork(emitSuppliesFetch),
        fork(emitNextSuppliesFetch),
    ]);
}
