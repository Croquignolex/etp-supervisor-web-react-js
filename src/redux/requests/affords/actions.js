// Reducer action types
export const STORE_AFFORDS_REQUEST_INIT = 'STORE_AFFORDS_REQUEST_INIT';
export const STORE_AFFORDS_REQUEST_RESET = 'STORE_AFFORDS_REQUEST_RESET';
export const STORE_AFFORDS_REQUEST_FAILED = 'STORE_AFFORDS_REQUEST_FAILED';
export const STORE_AFFORDS_REQUEST_SUCCEEDED = 'STORE_AFFORDS_REQUEST_SUCCEEDED';

export const STORE_NEXT_AFFORDS_REQUEST_INIT = 'STORE_NEXT_AFFORDS_REQUEST_INIT';
export const STORE_NEXT_AFFORDS_REQUEST_RESET = 'STORE_NEXT_AFFORDS_REQUEST_RESET';
export const STORE_NEXT_AFFORDS_REQUEST_FAILED = 'STORE_NEXT_AFFORDS_REQUEST_FAILED';
export const STORE_NEXT_AFFORDS_REQUEST_SUCCEEDED = 'STORE_NEXT_AFFORDS_REQUEST_SUCCEEDED';

export const STORE_ADD_AFFORD_REQUEST_INIT = 'STORE_ADD_AFFORD_REQUEST_INIT';
export const STORE_ADD_AFFORD_REQUEST_RESET = 'STORE_ADD_AFFORD_REQUEST_RESET';
export const STORE_ADD_AFFORD_REQUEST_FAILED = 'STORE_ADD_AFFORD_REQUEST_FAILED';
export const STORE_ADD_AFFORD_REQUEST_SUCCEEDED = 'STORE_ADD_AFFORD_REQUEST_SUCCEEDED';


// ======================================================== Affords
// Set affords init data into store
export const storeAffordsRequestInit = () => ({
    type: STORE_AFFORDS_REQUEST_INIT
});

// Set affords failed data into store
export const storeAffordsRequestFailed = ({message}) => ({
    message,
    type: STORE_AFFORDS_REQUEST_FAILED
});

// Set affords succeeded data into store
export const storeAffordsRequestSucceed = ({message}) => ({
    message,
    type: STORE_AFFORDS_REQUEST_SUCCEEDED
});

// Set affords reset data into store
export const storeAffordsRequestReset = () => ({
    type: STORE_AFFORDS_REQUEST_RESET
});
// ======================================================== Next affords
// Set next affords init data into store
export const storeNextAffordsRequestInit = () => ({
    type: STORE_NEXT_AFFORDS_REQUEST_INIT
});

// Set next affords failed data into store
export const storeNextAffordsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_AFFORDS_REQUEST_FAILED
});

// Set next affords succeeded data into store
export const storeNextAffordsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_AFFORDS_REQUEST_SUCCEEDED
});

// Set next affords reset data into store
export const storeNextAffordsRequestReset = () => ({
    type: STORE_NEXT_AFFORDS_REQUEST_RESET
});
// ======================================================== Add afford
// Set add afford init data into store
export const storeAddAffordRequestInit = () => ({
    type: STORE_ADD_AFFORD_REQUEST_INIT
});

// Set add afford failed data into store
export const storeAddAffordRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_AFFORD_REQUEST_FAILED
});

// Set add afford succeeded data into store
export const storeAddAffordRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_AFFORD_REQUEST_SUCCEEDED
});

// Set add afford reset data into store
export const storeAddAffordRequestReset = () => ({
    type: STORE_ADD_AFFORD_REQUEST_RESET
});
