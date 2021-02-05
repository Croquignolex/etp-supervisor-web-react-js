import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {EMIT_ALL_COMPANIES_FETCH, storeSetCompaniesData} from "./actions";
import {
    storeAllCompaniesRequestInit,
    storeAllCompaniesRequestFailed,
    storeAllCompaniesRequestSucceed
} from "../requests/companies/actions";

// Fetch all companies from API
export function* emitAllCompaniesFetch() {
    yield takeLatest(EMIT_ALL_COMPANIES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllCompaniesRequestInit());
            const apiResponse = yield call(apiGetRequest, api.All_COMPANIES_API_PATH);
            // Extract data
            const companies = extractCompaniesData(apiResponse.data.flotes);
            // Fire event to redux
            yield put(storeSetCompaniesData({companies, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllCompaniesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllCompaniesRequestFailed({message}));
        }
    });
}

// Extract zone data
function extractOperatorData(apiOperator) {
    let operator = {
        id: '', name: '', description: '', creation: '',
    };
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
function extractCompaniesData(apiCompanies) {
    const companies = [];
    if(apiCompanies) {
        apiCompanies.forEach(data => {
            companies.push(extractOperatorData(data.flote));
        });
    }
    return companies;
}

// Combine to export all functions at once
export default function* sagaCompanies() {
    yield all([
        fork(emitAllCompaniesFetch),
    ]);
}