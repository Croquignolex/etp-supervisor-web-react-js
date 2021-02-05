import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {
    storeSetOperatorsData,
    EMIT_OPERATORS_FETCH,
    EMIT_ALL_OPERATORS_FETCH,
    storeSetNextOperatorsData,
    EMIT_NEXT_OPERATORS_FETCH,
    storeStopInfiniteScrollOperatorData
} from "./actions";
import {
    storeOperatorsRequestInit,
    storeOperatorsRequestFailed,
    storeAllOperatorsRequestInit,
    storeOperatorsRequestSucceed,
    storeNextOperatorsRequestInit,
    storeAllOperatorsRequestFailed,
    storeNextOperatorsRequestFailed,
    storeAllOperatorsRequestSucceed,
    storeNextOperatorsRequestSucceed
} from "../requests/operators/actions";

// Fetch all operators from API
export function* emitAllOperatorsFetch() {
    yield takeLatest(EMIT_ALL_OPERATORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllOperatorsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_OPERATORS_API_PATH);
            // Extract data
            const operators = extractOperatorsData(apiResponse.data.flotes);
            // Fire event to redux
            yield put(storeSetOperatorsData({operators, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllOperatorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllOperatorsRequestFailed({message}));
        }
    });
}

// Fetch operators from API
export function* emitOperatorsFetch() {
    yield takeLatest(EMIT_OPERATORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeOperatorsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.OPERATORS_API_PATH}?page=1`);
            // Extract data
            const operators = extractOperatorsData(apiResponse.data.flotes);
            // Fire event to redux
            yield put(storeSetOperatorsData({operators, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeOperatorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeOperatorsRequestFailed({message}));
        }
    });
}

// Fetch next agents from API
export function* emitNextOperatorsFetch() {
    yield takeLatest(EMIT_NEXT_OPERATORS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextOperatorsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.OPERATORS_API_PATH}?page=${page}`);
            // Extract data
            const operators = extractOperatorsData(apiResponse.data.flotes);
            // Fire event to redux
            yield put(storeSetNextOperatorsData({operators, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextOperatorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextOperatorsRequestFailed({message}));
            yield put(storeStopInfiniteScrollOperatorData());
        }
    });
}

// Extract zone data
function extractOperatorData(apiOperator, apiSims) {
    let operator = {
        id: '', name: '', description: '', creation: '',

        sims: []
    };
    if(apiSims) {
        apiSims.forEach(data => {
            operator.sims.push({
                name: data.nom,
                number: data.numero,
                balance: data.solde,
                id: data.id.toString(),
                creation: data.created_at
            })
        });
    }
    if(apiOperator) {
        operator.actionLoader = false;
        operator.name = apiOperator.nom;
        operator.id = apiOperator.id.toString();
        operator.creation = apiOperator.created_at;
        operator.description = apiOperator.description;
    }
    return operator;
}

// Extract zones data
function extractOperatorsData(apiOperators) {
    const operators = [];
    if(apiOperators) {
        apiOperators.forEach(data => {
            operators.push(extractOperatorData(
                data.flote,
                data.puces,
            ));
        });
    }
    return operators;
}

// Combine to export all functions at once
export default function* sagaZones() {
    yield all([
        fork(emitOperatorsFetch),
        fork(emitAllOperatorsFetch),
        fork(emitNextOperatorsFetch),
    ]);
}