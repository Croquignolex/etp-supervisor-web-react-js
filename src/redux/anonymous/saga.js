import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ANONYMOUS_FETCH,
    storeSetAnonymousData,
    EMIT_NEXT_ANONYMOUS_FETCH,
    storeSetNextAnonymousData,
    storeStopInfiniteScrollAnonymousData
} from "./actions";
import {
    storeAnonymousRequestInit,
    storeAnonymousRequestFailed,
    storeAnonymousRequestSucceed,
    storeNextAnonymousRequestInit,
    storeNextAnonymousRequestFailed,
    storeNextAnonymousRequestSucceed
} from "../requests/anonymous/actions";

// Fetch anonymous from API
export function* emitAnonymousFetch() {
    yield takeLatest(EMIT_ANONYMOUS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAnonymousRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ANONYMOUS_FLEETS_API_PATH}?page=1`);
            // Extract data
            const anonymous = extractAnonymousData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetAnonymousData({anonymous, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAnonymousRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAnonymousRequestFailed({message}));
        }
    });
}

// Fetch next anonymous from API
export function* emitNextAnonymousFetch() {
    yield takeLatest(EMIT_NEXT_ANONYMOUS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextAnonymousRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ANONYMOUS_FLEETS_API_PATH}?page=${page}`);
            // Extract data
            const anonymous = extractAnonymousData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextAnonymousData({anonymous, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextAnonymousRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextAnonymousRequestFailed({message}));
            yield put(storeStopInfiniteScrollAnonymousData());
        }
    });
}

// Extract anonymous data
function extractAnoData(apiSim, apiUser, apiAnonymous) {
    let anonymous = {
        id: '', reference: '', amount: '', receiver: '', receiverSim: '', status: '', creation: '',

        claimant: {id: '', name: '', phone: ''},
        sim_outgoing: {id: '', name: '', number: ''},
    };
    if(apiSim) {
        anonymous.sim_outgoing = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiUser) {
        anonymous.claimant = {
            name: apiUser.name,
            phone: apiUser.phone,
            id: apiUser.id.toString(),
        }
    }
    if(apiAnonymous) {
        anonymous.actionLoader = false;
        anonymous.status = apiAnonymous.statut;
        anonymous.amount = apiAnonymous.montant;
        anonymous.id = apiAnonymous.id.toString();
        anonymous.receiver = apiAnonymous.nom_agent;
        anonymous.creation = apiAnonymous.created_at;
        anonymous.receiverSim = apiAnonymous.nro_sim_to;
    }
    return anonymous;
}

// Extract anonymous data
export function extractAnonymousData(apiAnonymous) {
    const anonymous = [];
    apiAnonymous.forEach(data => {
        anonymous.push(extractAnoData(
            data.puce_emetrice,
            data.user,
            data.flottage
        ));
    });
    return anonymous;
}

// Combine to export all functions at once
export default function* sagaAnonymous() {
    yield all([
        fork(emitAnonymousFetch),
        fork(emitNextAnonymousFetch),
    ]);
}
