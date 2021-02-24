import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_ZONE,
    EMIT_ZONES_FETCH,
    storeSetZonesData,
    storeSetNewZoneData,
    EMIT_ALL_ZONES_FETCH,
    storeSetNextZonesData,
    EMIT_NEXT_ZONES_FETCH,
    storeStopInfiniteScrollZoneData
} from "./actions";
import {
    storeZonesRequestInit,
    storeZonesRequestFailed,
    storeAddZoneRequestInit,
    storeAllZonesRequestInit,
    storeZonesRequestSucceed,
    storeNextZonesRequestInit,
    storeAddZoneRequestFailed,
    storeAddZoneRequestSucceed,
    storeAllZonesRequestFailed,
    storeNextZonesRequestFailed,
    storeAllZonesRequestSucceed,
    storeNextZonesRequestSucceed
} from "../requests/zones/actions";

// Fetch all zones from API
export function* emitAllZonesFetch() {
    yield takeLatest(EMIT_ALL_ZONES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllZonesRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_ZONES_API_PATH);
            // Extract data
            const zones = extractZonesData(apiResponse.data.zones);
            // Fire event to redux
            yield put(storeSetZonesData({zones, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllZonesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllZonesRequestFailed({message}));
        }
    });
}

// Fetch zones from API
export function* emitZonesFetch() {
    yield takeLatest(EMIT_ZONES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeZonesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ZONES_API_PATH}?page=1`);
            // Extract data
            const zones = extractZonesData(apiResponse.data.zones);
            // Fire event to redux
            yield put(storeSetZonesData({zones, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeZonesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeZonesRequestFailed({message}));
        }
    });
}

// Fetch next zones from API
export function* emitNextZonesFetch() {
    yield takeLatest(EMIT_NEXT_ZONES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextZonesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ZONES_API_PATH}?page=${page}`);
            // Extract data
            const zones = extractZonesData(apiResponse.data.zones);
            // Fire event to redux
            yield put(storeSetNextZonesData({zones, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextZonesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextZonesRequestFailed({message}));
            yield put(storeStopInfiniteScrollZoneData());
        }
    });
}

// New zone into API
export function* emitNewZone() {
    yield takeLatest(EMIT_NEW_ZONE, function*({name, reference, description}) {
        try {
            // Fire event for request
            yield put(storeAddZoneRequestInit());
            // From data
            const data = {name, reference, description}
            // API request
            const apiResponse = yield call(apiPostRequest, api.CREATE_ZONE_API_PATH, data);
            // Extract data
            const zone = extractZoneData(
                apiResponse.data.zone,
                apiResponse.data.agents,
                apiResponse.data.recouvreur
            );
            // Fire event to redux
            yield put(storeSetNewZoneData({zone}));
            // Fire event for request
            yield put(storeAddZoneRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddZoneRequestFailed({message}));
        }
    });
}

// Extract zone data
function extractZoneData(apiZone, apiAgents, apiCollector) {
    let zone = {
        id: '', name: '', reference: '', map: '', description: '', creation: '',

        collector: {id: '', name: '', phone: ''},

        agents: [],
    };
    if(apiAgents) {
        apiAgents.forEach(data => {
            const userData = data.user;
            const agentData = data.agent;
            zone.agents.push({
                name: userData.name,
                phone: userData.phone,
                id: userData.id.toString(),
                creation: userData.created_at,
                reference: agentData.reference
            })
        });
    }
    if(apiCollector) {
        zone.collector = {
            name: apiCollector.name,
            phone: apiCollector.phone,
            id: apiCollector.id.toString()
        }
    }
    if(apiZone) {
        zone.map = apiZone.map;
        zone.name = apiZone.nom;
        zone.actionLoader = false;
        zone.id = apiZone.id.toString();
        zone.reference = apiZone.reference;
        zone.creation = apiZone.created_at;
        zone.description = apiZone.description;
    }
    return zone;
}

// Extract zones data
function extractZonesData(apiZones) {
    const zones = [];
    if(apiZones) {
        apiZones.forEach(data => {
            zones.push(extractZoneData(
                data.zone,
                data.agents,
                data.recouvreur
            ));
        });
    }
    return zones;
}

// Combine to export all functions at once
export default function* sagaZones() {
    yield all([
        fork(emitNewZone),
        fork(emitZonesFetch),
        fork(emitAllZonesFetch),
        fork(emitNextZonesFetch),
    ]);
}