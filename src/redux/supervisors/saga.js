import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {APPROVE} from "../../constants/typeConstants";
import {PROFILE_SCOPE} from "../../constants/defaultConstants";
import {apiGetRequest, apiPostRequest, getImageFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_SUPERVISOR,
    EMIT_SUPERVISOR_FETCH,
    storeSetSupervisorData,
    EMIT_SUPERVISORS_FETCH,
    storeSetSupervisorsData,
    storeSetNewSupervisorData,
    EMIT_NEXT_SUPERVISORS_FETCH,
    storeSetNextSupervisorsData,
    storeStopInfiniteScrollSupervisorData
} from "./actions";
import {
    storeSupervisorRequestInit,
    storeSupervisorsRequestInit,
    storeSupervisorRequestFailed,
    storeAddSupervisorRequestInit,
    storeSupervisorsRequestFailed,
    storeSupervisorRequestSucceed,
    storeSupervisorsRequestSucceed,
    storeNextSupervisorsRequestInit,
    storeAddSupervisorRequestFailed,
    storeAddSupervisorRequestSucceed,
    storeNextSupervisorsRequestFailed,
    storeNextSupervisorsRequestSucceed,
} from "../requests/supervisors/actions";

// Fetch supervisors from API
export function* emitSupervisorsFetch() {
    yield takeLatest(EMIT_SUPERVISORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSupervisorsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPERVISORS_API_PATH}?page=1`);
            // Extract data
            const supervisors = extractSupervisorsData(apiResponse.data.superviseurs);
            // Fire event to redux
            yield put(storeSetSupervisorsData({supervisors, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSupervisorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSupervisorsRequestFailed({message}));
        }
    });
}

// Fetch next supervisors from API
export function* emitNextSupervisorsFetch() {
    yield takeLatest(EMIT_NEXT_SUPERVISORS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSupervisorsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPERVISORS_API_PATH}?page=${page}`);
            // Extract data
            const supervisors = extractSupervisorsData(apiResponse.data.superviseurs);
            // Fire event to redux
            yield put(storeSetNextSupervisorsData({supervisors, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSupervisorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSupervisorsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSupervisorData());
        }
    });
}

// New supervisor into API
export function* emitNewSupervisor() {
    yield takeLatest(EMIT_NEW_SUPERVISOR, function*({name, address, phone, email, password,  description}) {
        try {
            // Fire event for request
            yield put(storeAddSupervisorRequestInit());
            // From data
            const data = {name, phone, email, password, description, adresse: address}
            // API request
            const apiResponse = yield call(apiPostRequest, api.CREATE_SUPERVISOR_API_PATH, data);
            // Extract data
            const supervisor = extractSupervisorData(
                apiResponse.data.superviseur,
                apiResponse.data.caisse
            );
            // Fire event to redux
            yield put(storeSetNewSupervisorData({supervisor}));
            // Fire event for request
            yield put(storeAddSupervisorRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddSupervisorRequestFailed({message}));
        }
    });
}

// Fetch supervisor from API
export function* emitSupervisorFetch() {
    yield takeLatest(EMIT_SUPERVISOR_FETCH, function*({id}) {
        try {
            // Fire event for request
            yield put(storeSupervisorRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SUPERVISOR_DETAILS_API_PATH}/${id}`);
            // Extract data
            const supervisor = extractSupervisorData(
                apiResponse.data.user,
                apiResponse.data.caisse,
            );
            // Fire event to redux
            yield put(storeSetSupervisorData({supervisor}));
            // Fire event for request
            yield put(storeSupervisorRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSupervisorRequestFailed({message}));
        }
    });
}

// Extract supervisor data
function extractSupervisorData(apiSupervisor, apiAccount) {
    let supervisor = {
        id: '', name: '', phone: '', email: '', avatar: '', address: '', creation: '', description: '',

        account: {id: '', balance: ''},
    };

    if(apiAccount) {
        supervisor.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiSupervisor) {
        supervisor.actionLoader = false;
        supervisor.toggleLoader = false;
        supervisor.name = apiSupervisor.name;
        supervisor.phone = apiSupervisor.phone;
        supervisor.email = apiSupervisor.email;
        supervisor.address = apiSupervisor.adresse;
        supervisor.id = apiSupervisor.id.toString();
        supervisor.creation = apiSupervisor.created_at;
        supervisor.description = apiSupervisor.description;
        supervisor.status = apiSupervisor.statut === APPROVE;
        supervisor.avatar = getImageFromServer(apiSupervisor.avatar, PROFILE_SCOPE);
    }
    return supervisor;
}

// Extract supervisors data
function extractSupervisorsData(apiSupervisors) {
    const supervisors = [];
    if(apiSupervisors) {
        apiSupervisors.forEach(data => {
            supervisors.push(extractSupervisorData(
                data.superviseur,
                data.caisse,
            ));
        });
    }
    return supervisors;
}

// Combine to export all functions at once
export default function* sagaSupervisors() {
    yield all([
        fork(emitNewSupervisor),
        fork(emitSupervisorFetch),
        fork(emitSupervisorsFetch),
        fork(emitNextSupervisorsFetch),
    ]);
}