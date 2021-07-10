import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiPostRequest} from "../../functions/axiosFunctions";
import {EMIT_MOVEMENTS_FETCH, storeSetMovementsData} from "./actions";
import {dateToString, shortDateToString} from "../../functions/generalFunctions";
import {
    storeMovementsRequestInit,
    storeMovementsRequestFailed,
    storeMovementsRequestSucceed
} from "../requests/movements/actions";

// Fetch movements from API
export function* emitMovementsFetch() {
    yield takeLatest(EMIT_MOVEMENTS_FETCH, function*({selectedStartDay, selectedEndDay}) {
        try {
            // Fire event for request
            yield put(storeMovementsRequestInit());
            const data = {
                debut: shortDateToString(selectedStartDay),
                fin: shortDateToString(selectedEndDay),
            };
            const apiResponse = yield call(apiPostRequest, api.PERSONAL_MOVEMENTS_API_PATH, data);
            // Extract data
            const movements = extractMovementsData(
                apiResponse.data.movements
            );
            // Fire event to redux
            yield put(storeSetMovementsData({movements}));
            // Fire event for request
            yield put(storeMovementsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeMovementsRequestFailed({message}));
        }
    });
}

// Extract sim movements data
function extractMovementsData(apiMovements) {
    let movements = [];

    apiMovements.forEach(transaction => {
        movements.push({
            in: transaction.in,
            out: transaction.out,
            type: transaction.type,
            balance: transaction.balance,
            left_account: transaction.left,
            operator: transaction.operator,
            right_account: transaction.right,
            creation: dateToString(transaction.created_at),
        });
    });

    return movements;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitMovementsFetch),
    ]);
}