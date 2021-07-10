// Reducer action types
export const STORE_TRANSACTIONS_REQUEST_INIT = 'STORE_TRANSACTIONS_REQUEST_INIT';
export const STORE_TRANSACTIONS_REQUEST_RESET = 'STORE_TRANSACTIONS_REQUEST_RESET';
export const STORE_TRANSACTIONS_REQUEST_FAILED = 'STORE_TRANSACTIONS_REQUEST_FAILED';
export const STORE_TRANSACTIONS_REQUEST_SUCCEEDED = 'STORE_TRANSACTIONS_REQUEST_SUCCEEDED';

// ======================================================== Transactions
// Set collectors init data into store
export const storeCollectorsRequestInit = () => ({
    type: STORE_COLLECTORS_REQUEST_INIT
});

// Set collectors failed data into store
export const storeCollectorsRequestFailed = ({message}) => ({
    message,
    type: STORE_COLLECTORS_REQUEST_FAILED
});

// Set collectors succeeded data into store
export const storeCollectorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_COLLECTORS_REQUEST_SUCCEEDED
});

// Set collectors reset data into store
export const storeCollectorsRequestReset = () => ({
    type: STORE_COLLECTORS_REQUEST_RESET
});