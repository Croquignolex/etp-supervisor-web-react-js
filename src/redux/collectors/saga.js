import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {APPROVE} from "../../constants/typeConstants";
import {PROFILE_SCOPE} from "../../constants/defaultConstants";
import {apiGetRequest, apiPostRequest, getImageFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_COLLECTORS_FETCH,
    storeSetCollectorsData,
    EMIT_ALL_COLLECTORS_FETCH,
    storeSetNextCollectorsData,
    EMIT_NEXT_COLLECTORS_FETCH,
    storeSetCollectorActionData,
    storeSetCollectorToggleData,
    EMIT_TOGGLE_COLLECTOR_STATUS,
    storeStopInfiniteScrollCollectorData
} from "./actions";
import {
    storeCollectorsRequestInit,
    storeCollectorsRequestFailed,
    storeCollectorsRequestSucceed,
    storeAllCollectorsRequestInit,
    storeNextCollectorsRequestInit,
    storeAllCollectorsRequestFailed,
    storeNextCollectorsRequestFailed,
    storeAllCollectorsRequestSucceed,
    storeNextCollectorsRequestSucceed,
    storeCollectorStatusToggleRequestInit,
    storeCollectorStatusToggleRequestFailed,
    storeCollectorStatusToggleRequestSucceed
} from "../requests/collectors/actions";

// Fetch all collectors from API
export function* emitAllCollectorsFetch() {
    yield takeLatest(EMIT_ALL_COLLECTORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllCollectorsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_COLLECTORS_API_PATH);
            // Extract data
            const collectors = extractCollectorsData(apiResponse.data.recouvreurs);
            // Fire event to redux
            yield put(storeSetCollectorsData({collectors, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllCollectorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllCollectorsRequestFailed({message}));
        }
    });
}

// Fetch collectors from API
export function* emitCollectorsFetch() {
    yield takeLatest(EMIT_COLLECTORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeCollectorsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.COLLECTORS_API_PATH}?page=1`);
            // Extract data
            const collectors = extractCollectorsData(apiResponse.data.recouvreurs);
            // Fire event to redux
            yield put(storeSetCollectorsData({collectors, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeCollectorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeCollectorsRequestFailed({message}));
        }
    });
}

// Fetch next collectors from API
export function* emitNextCollectorsFetch() {
    yield takeLatest(EMIT_NEXT_COLLECTORS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextCollectorsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.COLLECTORS_API_PATH}?page=${page}`);
            // Extract data
            const collectors = extractCollectorsData(apiResponse.data.recouvreurs);
            // Fire event to redux
            yield put(storeSetNextCollectorsData({collectors, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextCollectorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextCollectorsRequestFailed({message}));
            yield put(storeStopInfiniteScrollCollectorData());
        }
    });
}

// Toggle collector status into API
export function* emitToggleCollectorStatus() {
    yield takeLatest(EMIT_TOGGLE_COLLECTOR_STATUS, function*({id}) {
        try {
            // Fire event for request
            yield put(storeSetCollectorActionData({id}));
            yield put(storeCollectorStatusToggleRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.TOGGLE_COLLECTOR_STATUS_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeSetCollectorToggleData({id}));
            // Fire event for request
            yield put(storeCollectorStatusToggleRequestSucceed({message: apiResponse.message}));
            yield put(storeSetCollectorActionData({id}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetCollectorActionData({id}));
            yield put(storeCollectorStatusToggleRequestFailed({message}));
        }
    });
}

// Extract collector data
function extractCollectorData(apiCollector, apiZone, apiAccount, apiSims) {
    let collector = {
        id: '', name: '', phone: '', email: '', avatar: '', address: '', creation: '', description: '',

        account: {id: '', balance: ''},
        zone: {id: '', name: '', map: ''},

        sims: []
    };
    if(apiSims) {
        apiSims.forEach(data => {
            collector.sims.push({
                name: data.nom,
                number: data.numero,
                balance: data.solde,
                id: data.id.toString(),
                creation: data.created_at
            })
        });
    }
    if(apiZone) {
        collector.zone = {
            map: apiZone.map,
            name: apiZone.nom,
            id: apiZone.id.toString()
        }
    }
    if(apiAccount) {
        collector.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiCollector) {
        collector.actionLoader = false;
        collector.toggleLoader = false;
        collector.name = apiCollector.name;
        collector.phone = apiCollector.phone;
        collector.email = apiCollector.email;
        collector.address = apiCollector.adresse;
        collector.id = apiCollector.id.toString();
        collector.creation = apiCollector.created_at;
        collector.description = apiCollector.description;
        collector.status = apiCollector.statut === APPROVE;
        collector.avatar = getImageFromServer(apiCollector.avatar, PROFILE_SCOPE);
    }
    return collector;
}

// Extract collectors data
function extractCollectorsData(apiCollectors) {
    const collectors = [];
    if(apiCollectors) {
        apiCollectors.forEach(data => {
            collectors.push(extractCollectorData(
                data.recouvreur,
                data.zone,
                data.caisse,
                data.puces
            ));
        });
    }
    return collectors;
}

// Combine to export all functions at once
export default function* sagaCollectors() {
    yield all([
        fork(emitCollectorsFetch),
        fork(emitAllCollectorsFetch),
        fork(emitNextCollectorsFetch),
        fork(emitToggleCollectorStatus),
    ]);
}