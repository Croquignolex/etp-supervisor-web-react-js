import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {APPROVE} from "../../constants/typeConstants";
import {PROFILE_SCOPE} from "../../constants/defaultConstants";
import {apiGetRequest, apiPostRequest, getImageFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_MANAGERS_FETCH,
    storeSetManagersData,
    EMIT_ALL_MANAGERS_FETCH,
    EMIT_NEXT_MANAGERS_FETCH,
    storeSetNextManagersData,
    storeSetManagerActionData,
    storeSetManagerToggleData,
    EMIT_TOGGLE_MANAGER_STATUS,
    storeStopInfiniteScrollManagerData, EMIT_NEW_MANAGER, storeSetNewManagerData
} from "./actions";
import {
    storeManagersRequestInit,
    storeManagersRequestFailed,
    storeManagersRequestSucceed,
    storeAllManagersRequestInit,
    storeNextManagersRequestInit,
    storeAllManagersRequestFailed,
    storeAllManagersRequestSucceed,
    storeNextManagersRequestFailed,
    storeNextManagersRequestSucceed,
    storeManagerStatusToggleRequestInit,
    storeManagerStatusToggleRequestFailed,
    storeManagerStatusToggleRequestSucceed,
    storeAddManagerRequestInit,
    storeAddManagerRequestSucceed,
    storeAddManagerRequestFailed
} from "../requests/managers/actions";
import {EMIT_NEW_COLLECTOR, storeSetNewCollectorData} from "../collectors/actions";
import {
    storeAddCollectorRequestFailed,
    storeAddCollectorRequestInit,
    storeAddCollectorRequestSucceed
} from "../requests/collectors/actions";

// Fetch all managers from API
export function* emitAllManagersFetch() {
    yield takeLatest(EMIT_ALL_MANAGERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllManagersRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_MANAGERS_API_PATH);
            // Extract data
            const managers = extractManagersData(apiResponse.data.gestionnaires);
            // Fire event to redux
            yield put(storeSetManagersData({managers, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllManagersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllManagersRequestFailed({message}));
        }
    });
}

// Fetch managers from API
export function* emitManagersFetch() {
    yield takeLatest(EMIT_MANAGERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeManagersRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.MANAGERS_API_PATH}?page=1`);
            // Extract data
            const managers = extractManagersData(apiResponse.data.gestionnaires);
            // Fire event to redux
            yield put(storeSetManagersData({managers, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeManagersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeManagersRequestFailed({message}));
        }
    });
}

// Fetch next managers from API
export function* emitNextManagersFetch() {
    yield takeLatest(EMIT_NEXT_MANAGERS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextManagersRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.MANAGERS_API_PATH}?page=${page}`);
            // Extract data
            const managers = extractManagersData(apiResponse.data.gestionnaires);
            // Fire event to redux
            yield put(storeSetNextManagersData({managers, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextManagersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextManagersRequestFailed({message}));
            yield put(storeStopInfiniteScrollManagerData());
        }
    });
}

// Toggle manager status into API
export function* emitToggleManagerStatus() {
    yield takeLatest(EMIT_TOGGLE_MANAGER_STATUS, function*({id}) {
        try {
            // Fire event for request
            yield put(storeSetManagerActionData({id}));
            yield put(storeManagerStatusToggleRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.TOGGLE_MANAGER_STATUS_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeSetManagerToggleData({id}));
            // Fire event for request
            yield put(storeManagerStatusToggleRequestSucceed({message: apiResponse.message}));
            yield put(storeSetManagerActionData({id}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetManagerActionData({id}));
            yield put(storeManagerStatusToggleRequestFailed({message}));
        }
    });
}

// New manager into API
export function* emitNewManager() {
    yield takeLatest(EMIT_NEW_MANAGER, function*({name, address, phone, email, password,  description}) {
        try {
            // Fire event for request
            yield put(storeAddManagerRequestInit());
            // From data
            const data = {name, phone, email, password, description, adresse: address}
            // API request
            const apiResponse = yield call(apiPostRequest, api.CREATE_MANAGER_API_PATH, data);
            // Extract data
            const manager = extractManagerData(
                apiResponse.data.gestionnaire,
                apiResponse.data.caisse
            );
            // Fire event to redux
            yield put(storeSetNewManagerData({manager}));
            // Fire event for request
            yield put(storeAddManagerRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddManagerRequestFailed({message}));
        }
    });
}

// Extract manager data
function extractManagerData(apiManager, apiAccount) {
    let manager = {
        id: '', name: '', phone: '', email: '', avatar: '', address: '', creation: '', description: '',

        account: {id: '', balance: ''},
    };

    if(apiAccount) {
        manager.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiManager) {
        manager.actionLoader = false;
        manager.toggleLoader = false;
        manager.name = apiManager.name;
        manager.phone = apiManager.phone;
        manager.email = apiManager.email;
        manager.address = apiManager.adresse;
        manager.id = apiManager.id.toString();
        manager.creation = apiManager.created_at;
        manager.description = apiManager.description;
        manager.status = apiManager.statut === APPROVE;
        manager.avatar = getImageFromServer(apiManager.avatar, PROFILE_SCOPE);
    }
    return manager;
}

// Extract managers data
function extractManagersData(apiManagers) {
    const managers = [];
    if(apiManagers) {
        apiManagers.forEach(data => {
            managers.push(extractManagerData(
                data.gestionnaire,
                data.caisse,
            ));
        });
    }
    return managers;
}

// Combine to export all functions at once
export default function* sagaManagers() {
    yield all([
        fork(emitNewManager),
        fork(emitManagersFetch),
        fork(emitAllManagersFetch),
        fork(emitNextManagersFetch),
        fork(emitToggleManagerStatus),
    ]);
}