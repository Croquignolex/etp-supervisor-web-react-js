import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_TRANSFER,
    EMIT_TRANSFERS_FETCH,
    EMIT_CANCEL_TRANSFER,
    storeSetTransfersData,
    EMIT_CONFIRM_TRANSFER,
    storeSetNewTransferData,
    storeCancelTransferData,
    storeUpdateTransferData,
    storeSetNextTransfersData,
    EMIT_NEXT_TRANSFERS_FETCH,
    storeSetTransferActionData,
    storeSetGroupTransfersData,
    EMIT_GROUP_TRANSFERS_FETCH,
    EMIT_GROUP_CONFIRM_TRANSFER,
    storeStopInfiniteScrollTransferData
} from "./actions";
import {
    storeTransfersRequestInit,
    storeTransfersRequestFailed,
    storeAddTransferRequestInit,
    storeTransfersRequestSucceed,
    storeAddTransferRequestFailed,
    storeNextTransfersRequestInit,
    storeAddTransferRequestSucceed,
    storeCancelTransferRequestInit,
    storeNextTransfersRequestFailed,
    storeConfirmTransferRequestInit,
    storeNextTransfersRequestSucceed,
    storeCancelTransferRequestFailed,
    storeConfirmTransferRequestFailed,
    storeCancelTransferRequestSucceed,
    storeConfirmTransferRequestSucceed
} from "../requests/transfers/actions";
import Lodash from "lodash";

// Fetch transfers from API
export function* emitTransfersFetch() {
    yield takeLatest(EMIT_TRANSFERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeTransfersRequestInit());
            yield put(storeSetTransfersData({transfers: [], hasMoreData: false, page: 0}));
            const apiResponse = yield call(apiGetRequest, `${api.TRANSFERS_API_PATH}?page=1`);
            // Extract data
            const transfers = extractTransfersData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetTransfersData({transfers, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeTransfersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeTransfersRequestFailed({message}));
        }
    });
}

// Fetch group transfers from API
export function* emitGroupTransfersFetch() {
    yield takeLatest(EMIT_GROUP_TRANSFERS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeTransfersRequestInit());
            yield put(storeSetTransfersData({transfers: [], hasMoreData: false, page: 0}));
            const apiResponse = yield call(apiGetRequest, api.GROUP_TRANSFERS_API_PATH);
            // Extract data
            const transfers = extractTransfersData(apiResponse.data.flottages);
            const groupedTransfer = Object.values(Lodash.groupBy(transfers, transfer => [transfer.user.id, transfer.operator.id]));
            // Fire event to redux
            yield put(storeSetGroupTransfersData({transfers: groupedTransfer}));
            // Fire event for request
            yield put(storeTransfersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeTransfersRequestFailed({message}));
        }
    });
}

// Confirm group transfer from API
export function* emitGroupConfirmTransfer() {
    yield takeLatest(EMIT_GROUP_CONFIRM_TRANSFER, function*({ids}) {
        try {
            // Fire event for request
            yield put(storeConfirmTransferRequestInit());
            const apiResponse = yield call(apiPostRequest, api.GROUP_CONFIRM_TRANSFER_API_PATH, {ids});
            const apiResponse2 = yield call(apiGetRequest, api.GROUP_TRANSFERS_API_PATH);
            // Extract data
            const transfers = extractTransfersData(apiResponse2.data.flottages);
            const groupedTransfer = Object.values(Lodash.groupBy(transfers, transfer => [transfer.user.id, transfer.operator.id]));
            // Fire event to redux
            yield put(storeSetGroupTransfersData({transfers: groupedTransfer}));
            // Fire event for request
            yield put(storeConfirmTransferRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeConfirmTransferRequestFailed({message}));
        }
    });
}

// Fetch next transfers from API
export function* emitNextTransfersFetch() {
    yield takeLatest(EMIT_NEXT_TRANSFERS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextTransfersRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.TRANSFERS_API_PATH}?page=${page}`);
            // Extract data
            const transfers = extractTransfersData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextTransfersData({transfers, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextTransfersRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextTransfersRequestFailed({message}));
            yield put(storeStopInfiniteScrollTransferData());
        }
    });
}

// New transfer from API
export function* emitAddTransfer() {
    yield takeLatest(EMIT_ADD_TRANSFER, function*({amount, managerSim, collectorSim}) {
        try {
            // Fire event for request
            yield put(storeAddTransferRequestInit());
            const data = {montant: amount, id_puce_to: collectorSim, id_puce_from: managerSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_TRANSFERS_API_PATH, data);
            // Extract data
            const transfer = extractTransferData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.utilisateur,
                apiResponse.data.flottage,
                apiResponse.data.operateur
            );
            // Fire event to redux
            yield put(storeSetNewTransferData({transfer}))
            // Fire event for request
            yield put(storeAddTransferRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddTransferRequestFailed({message}));
        }
    });
}

// Confirm transfer from API
export function* emitConfirmTransfer() {
    yield takeLatest(EMIT_CONFIRM_TRANSFER, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetTransferActionData({id}));
            // Fire event for request
            yield put(storeConfirmTransferRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CONFIRM_TRANSFER_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeUpdateTransferData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetTransferActionData({id}));
            // Fire event for request
            yield put(storeConfirmTransferRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetTransferActionData({id}));
            yield put(storeConfirmTransferRequestFailed({message}));
        }
    });
}

// Cancel transfer from API
export function* emitCancelTransfer() {
    yield takeLatest(EMIT_CANCEL_TRANSFER, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetTransferActionData({id}));
            // Fire event for request
            yield put(storeCancelTransferRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CANCEL_TRANSFER_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeCancelTransferData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetTransferActionData({id}));
            // Fire event for request
            yield put(storeCancelTransferRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetTransferActionData({id}));
            yield put(storeCancelTransferRequestFailed({message}));
        }
    });
}

// Extract transfer data
function extractTransferData(apiSimOutgoing, apiSimIncoming, apiUser, apiTransfer, apiOperator) {
    let transfer = {
        id: '', amount: '', creation: '', status: '', type: '',

        user: {id: '', name: ''},
        operator: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiSimOutgoing) {
        transfer.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        transfer.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiUser) {
        transfer.user = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiOperator) {
        transfer.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString(),
        }
    }
    if(apiTransfer) {
        transfer.actionLoader = false;
        transfer.type = apiTransfer.type;
        transfer.status = apiTransfer.statut;
        transfer.amount = apiTransfer.montant;
        transfer.id = apiTransfer.id.toString();
        transfer.creation = apiTransfer.created_at;
    }
    return transfer;
}

// Extract transfers data
export function extractTransfersData(apiTransfers) {
    const transfers = [];
    apiTransfers.forEach(data => {
        transfers.push(extractTransferData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.utilisateur,
            data.flottage,
            data.operateur
        ));
    });
    return transfers;
}

// Combine to export all functions at once
export default function* sagaTransfers() {
    yield all([
        fork(emitAddTransfer),
        fork(emitTransfersFetch),
        fork(emitCancelTransfer),
        fork(emitConfirmTransfer),
        fork(emitNextTransfersFetch),
        fork(emitGroupTransfersFetch),
        fork(emitGroupConfirmTransfer),
    ]);
}
