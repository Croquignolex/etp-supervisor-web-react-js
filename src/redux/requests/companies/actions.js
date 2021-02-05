// Reducer action types
export const STORE_ALL_COMPANIES_REQUEST_INIT = 'STORE_ALL_COMPANIES_REQUEST_INIT';
export const STORE_ALL_COMPANIES_REQUEST_RESET = 'STORE_ALL_COMPANIES_REQUEST_RESET';
export const STORE_ALL_COMPANIES_REQUEST_FAILED = 'STORE_ALL_COMPANIES_REQUEST_FAILED';
export const STORE_ALL_COMPANIES_REQUEST_SUCCEEDED = 'STORE_ALL_COMPANIES_REQUEST_SUCCEEDED';

// ======================================================== All zones
// Set all companies init data into store
export const storeAllCompaniesRequestInit = () => ({
    type: STORE_ALL_COMPANIES_REQUEST_INIT
});

// Set all companies failed data into store
export const storeAllCompaniesRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_COMPANIES_REQUEST_FAILED
});

// Set all companies succeeded data into store
export const storeAllCompaniesRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_COMPANIES_REQUEST_SUCCEEDED
});

// Set all companies reset data into store
export const storeAllCompaniesRequestReset = () => ({
    type: STORE_ALL_COMPANIES_REQUEST_RESET
});