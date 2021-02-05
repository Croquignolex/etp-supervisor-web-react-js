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
            const companies = extractCompaniesData(apiResponse.data.entreprises);
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

// Extract company data
function extractCompanyData(apiCompany) {
    let company = {
        id: '', name: '', manager: '', phone: '', document: '',
        address: '', creation: '', description: '',

        sims: []
    };
    const apiSims = apiCompany.puces;
    if(apiSims) {
        apiSims.forEach(data => {
            company.sims.push({
                name: data.nom,
                number: data.numero,
                actionLoader: false,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at
            })
        });
    }
    if(apiCompany) {
        company.actionLoader = false;
        company.name = apiCompany.nom;
        company.phone = apiCompany.phone;
        company.address = apiCompany.adresse;
        company.id = apiCompany.id.toString();
        company.manager = apiCompany.responsable;
        company.creation = apiCompany.created_at;
        company.description = apiCompany.description;
        company.document = getFileFromServer(apiCompany.dossier);
    }
    return operator;
}

// Extract operators data
function extractCompaniesData(apiCompanies) {
    const companies = [];
    if(apiCompanies) {
        apiCompanies.forEach(data => {
            companies.push(extractCompanyData(data));
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