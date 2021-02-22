import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {APPROVE} from "../../constants/typeConstants";
import {PROFILE_SCOPE} from "../../constants/defaultConstants";
import {apiGetRequest, apiPostRequest, getImageFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_COLLECTOR,
    EMIT_COLLECTOR_FETCH,
    storeSetCollectorData,
    EMIT_COLLECTORS_FETCH,
    storeSetCollectorsData,
    EMIT_ADD_COLLECTOR_SIMS,
    storeSetNewCollectorData,
    EMIT_ALL_COLLECTORS_FETCH,
    storeSetNextCollectorsData,
    EMIT_UPDATE_COLLECTOR_ZONE,
    EMIT_UPDATE_COLLECTOR_INFO,
    EMIT_NEXT_COLLECTORS_FETCH,
    storeSetCollectorActionData,
    storeSetCollectorToggleData,
    EMIT_TOGGLE_COLLECTOR_STATUS,
    storeStopInfiniteScrollCollectorData
} from "./actions";
import {
    storeCollectorRequestInit,
    storeCollectorsRequestInit,
    storeCollectorRequestFailed,
    storeAddCollectorRequestInit,
    storeCollectorsRequestFailed,
    storeCollectorRequestSucceed,
    storeCollectorsRequestSucceed,
    storeAllCollectorsRequestInit,
    storeNextCollectorsRequestInit,
    storeAddCollectorRequestFailed,
    storeAllCollectorsRequestFailed,
    storeAddCollectorRequestSucceed,
    storeCollectorAddSimRequestInit,
    storeNextCollectorsRequestFailed,
    storeAllCollectorsRequestSucceed,
    storeNextCollectorsRequestSucceed,
    storeCollectorEditInfoRequestInit,
    storeCollectorAddSimRequestFailed,
    storeCollectorEditZoneRequestInit,
    storeCollectorAddSimRequestSucceed,
    storeCollectorEditZoneRequestFailed,
    storeCollectorEditInfoRequestFailed,
    storeCollectorEditInfoRequestSucceed,
    storeCollectorEditZoneRequestSucceed,
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

// Update collector info
export function* emitUpdateCollectorInfo() {
    yield takeLatest(EMIT_UPDATE_COLLECTOR_INFO, function*({id, email, name, address, description}) {
        try {
            // Fire event for request
            yield put(storeCollectorEditInfoRequestInit());
            const data = {email, name, adresse: address, description};
            const apiResponse = yield call(apiPostRequest, `${api.EDIT_COLLECTOR_API_PATH}/${id}`, data);
            // Extract data
            const collector = extractCollectorData(
                apiResponse.data.user,
                apiResponse.data.zone,
                apiResponse.data.caisse,
                apiResponse.data.puces
            );
            // Fire event to redux
            yield put(storeSetCollectorData({collector, alsoInList: true}));
            // Fire event for request
            yield put(storeCollectorEditInfoRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeCollectorEditInfoRequestFailed({message}));
        }
    });
}

// New collector into API
export function* emitNewCollector() {
    yield takeLatest(EMIT_NEW_COLLECTOR, function*({name, address, phone, zone, email, password,  description}) {
        try {
            // Fire event for request
            yield put(storeAddCollectorRequestInit());
            // From data
            const data = {name, phone, email, password, description, id_zone: zone, adresse: address}
            // API request
            const apiResponse = yield call(apiPostRequest, api.CREATE_COLLECTOR_API_PATH, data);
            // Extract data
            const collector = extractCollectorData(
                apiResponse.data.recouvreur,
                apiResponse.data.zone,
                apiResponse.data.caisse
            );
            // Fire event to redux
            yield put(storeSetNewCollectorData({collector}));
            // Fire event for request
            yield put(storeAddCollectorRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddCollectorRequestFailed({message}));
        }
    });
}

// Update collector zone
export function* emitUpdateCollectorZone() {
    yield takeLatest(EMIT_UPDATE_COLLECTOR_ZONE, function*({id, zone}) {
        try {
            // Fire event for request
            yield put(storeCollectorEditZoneRequestInit());
            const data = {id_zone: zone};
            const apiResponse = yield call(apiPostRequest, `${api.COLLECTOR_ZONE_UPDATE_API_PATH}/${id}`, data);
            // Extract data
            const collector = extractCollectorData(
                apiResponse.data.user,
                apiResponse.data.zone,
                apiResponse.data.caisse,
                apiResponse.data.puces
            );
            // Fire event to redux
            yield put(storeSetCollectorData({collector, alsoInList: true}));
            // Fire event for request
            yield put(storeCollectorEditZoneRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeCollectorEditZoneRequestFailed({message}));
        }
    });
}

// Fetch collector from API
export function* emitCollectorFetch() {
    yield takeLatest(EMIT_COLLECTOR_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeCollectorRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.COLLECTOR_DETAILS_API_PATH}/${id}`);
            // Extract data
            const collector = extractCollectorData(
                apiResponse.data.user,
                apiResponse.data.zone,
                apiResponse.data.caisse,
                apiResponse.data.puces
            );
            // Fire event to redux
            yield put(storeSetCollectorData({collector}));
            // Fire event for request
            yield put(storeCollectorRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeCollectorRequestFailed({message}));
        }
    });
}

// Add collector sim
export function* emitAddCollectorSims() {
    yield takeLatest(EMIT_ADD_COLLECTOR_SIMS, function*({id, name, number, description, operator}) {
        try {
            // Fire event for request
            yield put(storeCollectorAddSimRequestInit());
            const data = {nom: name, description, numero: number, id_flotte: operator}
            const apiResponse = yield call(apiPostRequest, `${api.COLLECTOR_ADD_SIM}/${id}`, data);
            // Extract data
            const collector = extractCollectorData(
                apiResponse.data.user,
                apiResponse.data.zone,
                apiResponse.data.caisse,
                apiResponse.data.puces
            );
            // Fire event to redux
            yield put(storeSetCollectorData({collector, alsoInList: true}));
            // Fire event for request
            yield put(storeCollectorAddSimRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeCollectorAddSimRequestFailed({message}));
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
        fork(emitNewCollector),
        fork(emitCollectorFetch),
        fork(emitCollectorsFetch),
        fork(emitAddCollectorSims),
        fork(emitAllCollectorsFetch),
        fork(emitNextCollectorsFetch),
        fork(emitUpdateCollectorInfo),
        fork(emitUpdateCollectorZone),
        fork(emitToggleCollectorStatus),
    ]);
}