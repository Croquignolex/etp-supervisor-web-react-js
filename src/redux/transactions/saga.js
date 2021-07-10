import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {dateToString, shortDateToString} from "../../functions/generalFunctions";
import {
    EMIT_NEW_SIM,
    EMIT_SIM_FETCH,
    storeSetSimData,
    EMIT_UPDATE_SIM,
    EMIT_SIMS_FETCH,
    storeSetSimsData,
    storeSetNewSimData,
    EMIT_ALL_SIMS_FETCH,
    EMIT_NEXT_SIMS_FETCH,
    storeSetNextSimsData,
    EMIT_FLEETS_SIMS_FETCH,
    EMIT_AGENTS_SIMS_FETCH,
    EMIT_SEARCH_SIMS_FETCH,
    EMIT_MASTERS_SIMS_FETCH,
    EMIT_INTERNAL_SIMS_FETCH,
    EMIT_RESOURCES_SIMS_FETCH,
    EMIT_ALL_MASTER_SIMS_FETCH,
    EMIT_COLLECTORS_SIMS_FETCH,
    EMIT_NEXT_AGENTS_SIMS_FETCH,
    EMIT_SIM_TRANSACTIONS_FETCH,
    EMIT_NEXT_FLEETS_SIMS_FETCH,
    storeSetSimTransactionsData,
    EMIT_NEXT_MASTERS_SIMS_FETCH,
    storeStopInfiniteScrollSimData,
    EMIT_NEXT_RESOURCES_SIMS_FETCH,
    EMIT_NEXT_COLLECTORS_SIMS_FETCH
} from "./actions";
import {
    storeSimsRequestInit,
    storeSimsRequestFailed,
    storeAddSimRequestInit,
    storeShowSimRequestInit,
    storeSimsRequestSucceed,
    storeAllSimsRequestInit,
    storeEditSimRequestInit,
    storeNextSimsRequestInit,
    storeAddSimRequestFailed,
    storeShowSimRequestFailed,
    storeAllSimsRequestFailed,
    storeAddSimRequestSucceed,
    storeEditSimRequestFailed,
    storeShowSimRequestSucceed,
    storeNextSimsRequestFailed,
    storeAllSimsRequestSucceed,
    storeEditSimRequestSucceed,
    storeNextSimsRequestSucceed,
    storeAllMasterSimsRequestInit,
    storeAllInternalSimsRequestInit,
    storeSimTransactionsRequestInit,
    storeAllMasterSimsRequestFailed,
    storeAllMasterSimsRequestSucceed,
    storeAllInternalSimsRequestFailed,
    storeSimTransactionsRequestFailed,
    storeAllInternalSimsRequestSucceed,
    storeSimTransactionsRequestSucceed
} from "../requests/sims/actions";

// Fetch sim transactions from API
export function* emitTransactionsFetch() {
    yield takeLatest(EMIT_TRANSACTIONS_FETCH, function*({id, selectedStartDay, selectedEndDay}) {
        try {
            // Fire event for request
            yield put(storeSimTransactionsRequestInit());
            const data = {
                debut: shortDateToString(selectedStartDay),
                fin: shortDateToString(selectedEndDay),
            };
            const apiResponse = yield call(apiPostRequest, `${api.SIM_TRANSACTIONS_API_PATH}/${id}`, data);
            // Extract data
            const transactions = extractSimTransactionsData(
                apiResponse.data.transactions
            );
            // Fire event to redux
            yield put(storeSetSimTransactionsData({transactions}));
            // Fire event for request
            yield put(storeSimTransactionsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimTransactionsRequestFailed({message}));
        }
    });
}

// Extract sim transactions data
function extractSimTransactionsData(apiTransactions) {
    let transactions = [];

    apiTransactions.forEach(transaction => {
        transactions.push({
            in: transaction.in,
            out: transaction.out,
            type: transaction.type,
            user: transaction.user,
            balance: transaction.balance,
            operator: transaction.operator,
            right_account: transaction.right,
            creation: dateToString(transaction.created_at),
        });
    });

    return transactions;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitAllTransactionsFetch),
    ]);
}