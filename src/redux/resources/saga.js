import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {APPROVE} from "../../constants/typeConstants";
import {PROFILE_SCOPE} from "../../constants/defaultConstants";
import {apiGetRequest, apiPostRequest, getImageFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_RESOURCE,
    EMIT_RESOURCE_FETCH,
    EMIT_RESOURCES_FETCH,
    storeSetResourceData,
    storeSetResourcesData,
    storeSetNewResourceData,
    EMIT_ALL_RESOURCES_FETCH,
    EMIT_NEXT_RESOURCES_FETCH,
    storeSetNextResourcesData,
    EMIT_UPDATE_RESOURCE_INFO,
    storeSetResourceActionData,
    storeSetResourceToggleData,
    EMIT_SEARCH_RESOURCES_FETCH,
    EMIT_TOGGLE_RESOURCE_STATUS,
    storeStopInfiniteScrollResourceData
} from "./actions";
import {
    storeResourceRequestInit,
    storeResourcesRequestInit,
    storeResourceRequestFailed,
    storeResourcesRequestFailed,
    storeResourceRequestSucceed,
    storeAddResourceRequestInit,
    storeAllResourcesRequestInit,
    storeResourcesRequestSucceed,
    storeAddResourceRequestFailed,
    storeNextResourcesRequestInit,
    storeAllResourcesRequestFailed,
    storeAddResourceRequestSucceed,
    storeNextResourcesRequestFailed,
    storeAllResourcesRequestSucceed,
    storeNextResourcesRequestSucceed,
    storeResourceEditInfoRequestInit,
    storeResourceEditInfoRequestFailed,
    storeResourceEditInfoRequestSucceed,
    storeResourceStatusToggleRequestInit,
    storeResourceStatusToggleRequestFailed,
    storeResourceStatusToggleRequestSucceed
} from "../requests/resources/actions";

// Fetch all resources from API
export function* emitAllResourcesFetch() {
    yield takeLatest(EMIT_ALL_RESOURCES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllResourcesRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_RESOURCES_API_PATH);
            // Extract data
            const resources = extractResourcesData(apiResponse.data.resources);
            // Fire event to redux
            yield put(storeSetResourcesData({resources, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllResourcesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllResourcesRequestFailed({message}));
        }
    });
}

// Fetch resources from API
export function* emitResourcesFetch() {
    yield takeLatest(EMIT_RESOURCES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeResourcesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.RESOURCES_API_PATH}?page=1`);
            // Extract data
            const resources = extractResourcesData(apiResponse.data.resources);
            // Fire event to redux
            yield put(storeSetResourcesData({resources, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeResourcesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeResourcesRequestFailed({message}));
        }
    });
}

// Fetch next resources from API
export function* emitNextResourcesFetch() {
    yield takeLatest(EMIT_NEXT_RESOURCES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextResourcesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.RESOURCES_API_PATH}?page=${page}`);
            // Extract data
            const resources = extractResourcesData(apiResponse.data.resources);
            // Fire event to redux
            yield put(storeSetNextResourcesData({resources, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextResourcesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextResourcesRequestFailed({message}));
            yield put(storeStopInfiniteScrollResourceData());
        }
    });
}

// New resource into API
export function* emitNewResource() {
    yield takeLatest(EMIT_NEW_RESOURCE, function*({name, address, phone, email, description}) {
        try {
            // Fire event for request
            yield put(storeAddResourceRequestInit());
            // From data
            const data = new FormData();
            data.append('name', name);
            data.append('phone', phone);
            data.append('email', email);
            data.append('adresse', address);
            data.append('description', description);
            // API request
            const apiResponse = yield call(apiPostRequest, api.CREATE_RESOURCE_API_PATH, data);
            // Extract data
            const resource = extractResourceData(
                apiResponse.data.resource,
                apiResponse.data.caisse,
                apiResponse.data.createur,
            );
            // Fire event to redux
            yield put(storeSetNewResourceData({resource}));
            // Fire event for request
            yield put(storeAddResourceRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddResourceRequestFailed({message}));
        }
    });
}

// Fetch resource from API
export function* emitResourceFetch() {
    yield takeLatest(EMIT_RESOURCE_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeResourceRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.RESOURCE_API_PATH}/${id}`);
            // Extract data
            const resource = extractResourceData(
                apiResponse.data.user,
                apiResponse.data.caisse,
                apiResponse.data.createur,
            );
            // Fire event to redux
            yield put(storeSetResourceData({resource}));
            // Fire event for request
            yield put(storeResourceRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeResourceRequestFailed({message}));
        }
    });
}

// Toggle resource status into API
export function* emitToggleResourceStatus() {
    yield takeLatest(EMIT_TOGGLE_RESOURCE_STATUS, function*({id}) {
        try {
            // Fire event for request
            yield put(storeSetResourceActionData({id}));
            yield put(storeResourceStatusToggleRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.TOGGLE_RESOURCE_STATUS_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeSetResourceToggleData({id}));
            // Fire event for request
            yield put(storeResourceStatusToggleRequestSucceed({message: apiResponse.message}));
            yield put(storeSetResourceActionData({id}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetResourceActionData({id}));
            yield put(storeResourceStatusToggleRequestFailed({message}));
        }
    });
}

// Update resource info
export function* emitUpdateResourceInfo() {
    yield takeLatest(EMIT_UPDATE_RESOURCE_INFO, function*({id, email, name, address, description}) {
        try {
            // Fire event for request
            yield put(storeResourceEditInfoRequestInit());
            const data = {email, name, adresse: address, description};
            const apiResponse = yield call(apiPostRequest, `${api.EDIT_RESOURCE_INFO_API_PATH}/${id}`, data);
            // Extract data
            const resource = extractResourceData(
                apiResponse.data.user,
                apiResponse.data.caisse,
                apiResponse.data.createur,
            );
            // Fire event to redux
            yield put(storeSetResourceData({resource, alsoInList: true}));
            // Fire event for request
            yield put(storeResourceEditInfoRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeResourceEditInfoRequestFailed({message}));
        }
    });
}

// Extract sim data
function extractResourceData(apiResource, apiAccount, apiCreator) {
    let resource = {
        description: '', phone: '', email: '', creation: '',
        id: '', name: '', address: '', avatar: '', status: '',

        creator: {id: '', name: ''},
        account: {id: '', balance: ''}
    };
    if(apiAccount) {
        resource.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiCreator) {
        resource.creator = {
            name: apiCreator.name,
            id: apiCreator.id.toString(),
        }
    }
    if(apiResource) {
        resource.name = apiResource.name;
        resource.actionLoader = false;
        resource.toggleLoader = false;
        resource.phone = apiResource.phone;
        resource.email = apiResource.email;
        resource.address = apiResource.adresse;
        resource.id = apiResource.id.toString();
        resource.creation = apiResource.created_at;
        resource.description = apiResource.description;
        resource.status = apiResource.statut === APPROVE;
        resource.avatar = getImageFromServer(apiResource.avatar, PROFILE_SCOPE);
    }
    return resource;
}

// Extract resources data
function extractResourcesData(apiResources) {
    const resources = [];
    if(apiResources) {
        apiResources.forEach(data => {
            resources.push(extractResourceData(
                data.resource,
                data.caisse,
                data.createur
            ));
        });
    }
    return resources;
}

// Combine to export all functions at once
export default function* sagaResources() {
    yield all([
        fork(emitNewResource),
        fork(emitResourceFetch),
        fork(emitResourcesFetch),
        fork(emitAllResourcesFetch),
        fork(emitNextResourcesFetch),
        fork(emitUpdateResourceInfo),
        fork(emitToggleResourceStatus),
    ]);
}
