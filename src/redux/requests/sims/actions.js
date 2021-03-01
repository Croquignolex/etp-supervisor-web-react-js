// Reducer action types
export const STORE_SIMS_REQUEST_INIT = 'STORE_SIMS_REQUEST_INIT';
export const STORE_SIMS_REQUEST_RESET = 'STORE_SIMS_REQUEST_RESET';
export const STORE_SIMS_REQUEST_FAILED = 'STORE_SIMS_REQUEST_FAILED';
export const STORE_SIMS_REQUEST_SUCCEEDED = 'STORE_SIMS_REQUEST_SUCCEEDED';

export const STORE_NEXT_SIMS_REQUEST_INIT = 'STORE_NEXT_SIMS_REQUEST_INIT';
export const STORE_NEXT_SIMS_REQUEST_RESET = 'STORE_NEXT_SIMS_REQUEST_RESET';
export const STORE_NEXT_SIMS_REQUEST_FAILED = 'STORE_NEXT_SIMS_REQUEST_FAILED';
export const STORE_NEXT_SIMS_REQUEST_SUCCEEDED = 'STORE_NEXT_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_SIMS_REQUEST_INIT = 'STORE_ALL_SIMS_REQUEST_INIT';
export const STORE_ALL_SIMS_REQUEST_RESET = 'STORE_ALL_SIMS_REQUEST_RESET';
export const STORE_ALL_SIMS_REQUEST_FAILED = 'STORE_ALL_SIMS_REQUEST_FAILED';
export const STORE_ALL_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_SIMS_REQUEST_SUCCEEDED';

export const STORE_ADD_SIM_REQUEST_INIT = 'STORE_ADD_SIM_REQUEST_INIT';
export const STORE_ADD_SIM_REQUEST_RESET = 'STORE_ADD_SIM_REQUEST_RESET';
export const STORE_ADD_SIM_REQUEST_FAILED = 'STORE_ADD_SIM_REQUEST_FAILED';
export const STORE_ADD_SIM_REQUEST_SUCCEEDED = 'STORE_ADD_SIM_REQUEST_SUCCEEDED';

export const STORE_SHOW_SIM_REQUEST_INIT = 'STORE_SHOW_SIM_REQUEST_INIT';
export const STORE_SHOW_SIM_REQUEST_RESET = 'STORE_SHOW_SIM_REQUEST_RESET';
export const STORE_SHOW_SIM_REQUEST_FAILED = 'STORE_SHOW_SIM_REQUEST_FAILED';
export const STORE_SHOW_SIM_REQUEST_SUCCEEDED = 'STORE_SHOW_SIM_REQUEST_SUCCEEDED';

export const STORE_EDIT_SIM_REQUEST_INIT = 'STORE_EDIT_SIM_REQUEST_INIT';
export const STORE_EDIT_SIM_REQUEST_RESET = 'STORE_EDIT_SIM_REQUEST_RESET';
export const STORE_EDIT_SIM_REQUEST_FAILED = 'STORE_EDIT_SIM_REQUEST_FAILED';
export const STORE_EDIT_SIM_REQUEST_SUCCEEDED = 'STORE_EDIT_SIM_REQUEST_SUCCEEDED';

// ======================================================== Sims
// Set sims init data into store
export const storeSimsRequestInit = () => ({
    type: STORE_SIMS_REQUEST_INIT
});

// Set sims failed data into store
export const storeSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_SIMS_REQUEST_FAILED
});

// Set sims succeeded data into store
export const storeSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_SIMS_REQUEST_SUCCEEDED
});

// Set sims reset data into store
export const storeSimsRequestReset = () => ({
    type: STORE_SIMS_REQUEST_RESET
});
// ======================================================== Next sims
// Set next sims init data into store
export const storeNextSimsRequestInit = () => ({
    type: STORE_NEXT_SIMS_REQUEST_INIT
});

// Set next sims failed data into store
export const storeNextSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_SIMS_REQUEST_FAILED
});

// Set next sims succeeded data into store
export const storeNextSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_SIMS_REQUEST_SUCCEEDED
});

// Set next sims reset data into store
export const storeNextSimsRequestReset = () => ({
    type: STORE_NEXT_SIMS_REQUEST_RESET
});
// ======================================================== All sims
// Set all sims init data into store
export const storeAllSimsRequestInit = () => ({
    type: STORE_ALL_SIMS_REQUEST_INIT
});

// Set all sims failed data into store
export const storeAllSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_SIMS_REQUEST_FAILED
});

// Set all sims succeeded data into store
export const storeAllSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_SIMS_REQUEST_SUCCEEDED
});

// Set all sims reset data into store
export const storeAllSimsRequestReset = () => ({
    type: STORE_ALL_SIMS_REQUEST_RESET
});
// ======================================================== Add sim
// Set add sim init data into store
export const storeAddSimRequestInit = () => ({
    type: STORE_ADD_SIM_REQUEST_INIT
});

// Set add sim failed data into store
export const storeAddSimRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_SIM_REQUEST_FAILED
});

// Set add sim succeeded data into store
export const storeAddSimRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_SIM_REQUEST_SUCCEEDED
});

// Set add sim reset data into store
export const storeAddSimRequestReset = () => ({
    type: STORE_ADD_SIM_REQUEST_RESET
});
// ======================================================== Show sim
// Set show sim init data into store
export const storeShowSimRequestInit = () => ({
    type: STORE_SHOW_SIM_REQUEST_INIT
});

// Set show sim failed data into store
export const storeShowSimRequestFailed = ({message}) => ({
    message,
    type: STORE_SHOW_SIM_REQUEST_FAILED
});

// Set show sim succeeded data into store
export const storeShowSimRequestSucceed = ({message}) => ({
    message,
    type: STORE_SHOW_SIM_REQUEST_SUCCEEDED
});

// Set show sim reset data into store
export const storeShowSimRequestReset = () => ({
    type: STORE_SHOW_SIM_REQUEST_RESET
});
// ======================================================== Edit sim
// Set edit sim init data into store
export const storeEditSimRequestInit = () => ({
    type: STORE_EDIT_SIM_REQUEST_INIT
});

// Set edit sim failed data into store
export const storeEditSimRequestFailed = ({message}) => ({
    message,
    type: STORE_EDIT_SIM_REQUEST_FAILED
});

// Set edit sim succeeded data into store
export const storeEditSimRequestSucceed = ({message}) => ({
    message,
    type: STORE_EDIT_SIM_REQUEST_SUCCEEDED
});

// Set edit sim reset data into store
export const storeEditSimRequestReset = () => ({
    type: STORE_EDIT_SIM_REQUEST_RESET
});