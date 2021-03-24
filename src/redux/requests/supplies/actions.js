// Reducer action types
export const STORE_SUPPLIES_REQUEST_INIT = 'STORE_SUPPLIES_REQUEST_INIT';
export const STORE_SUPPLIES_REQUEST_RESET = 'STORE_SUPPLIES_REQUEST_RESET';
export const STORE_SUPPLIES_REQUEST_FAILED = 'STORE_SUPPLIES_REQUEST_FAILED';
export const STORE_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_NEXT_SUPPLIES_REQUEST_INIT = 'STORE_NEXT_SUPPLIES_REQUEST_INIT';
export const STORE_NEXT_SUPPLIES_REQUEST_RESET = 'STORE_NEXT_SUPPLIES_REQUEST_RESET';
export const STORE_NEXT_SUPPLIES_REQUEST_FAILED = 'STORE_NEXT_SUPPLIES_REQUEST_FAILED';
export const STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_SHOW_SUPPLY_REQUEST_INIT = 'STORE_SHOW_SUPPLY_REQUEST_INIT';
export const STORE_SHOW_SUPPLY_REQUEST_RESET = 'STORE_SHOW_SUPPLY_REQUEST_RESET';
export const STORE_SHOW_SUPPLY_REQUEST_FAILED = 'STORE_SHOW_SUPPLY_REQUEST_FAILED';
export const STORE_SHOW_SUPPLY_REQUEST_SUCCEEDED = 'STORE_SHOW_SUPPLY_REQUEST_SUCCEEDED';

// ======================================================== Supplies
// Set supplies init data into store
export const storeSuppliesRequestInit = () => ({
    type: STORE_SUPPLIES_REQUEST_INIT
});

// Set supplies failed data into store
export const storeSuppliesRequestFailed = ({message}) => ({
    message,
    type: STORE_SUPPLIES_REQUEST_FAILED
});

// Set supplies succeeded data into store
export const storeSuppliesRequestSucceed = ({message}) => ({
    message,
    type: STORE_SUPPLIES_REQUEST_SUCCEEDED
});

// Set supplies reset data into store
export const storeSuppliesRequestReset = () => ({
    type: STORE_SUPPLIES_REQUEST_RESET
});
// ======================================================== Next supplies
// Set next supplies init data into store
export const storeNextSuppliesRequestInit = () => ({
    type: STORE_NEXT_SUPPLIES_REQUEST_INIT
});

// Set next supplies failed data into store
export const storeNextSuppliesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_SUPPLIES_REQUEST_FAILED
});

// Set next supplies succeeded data into store
export const storeNextSuppliesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED
});

// Set next supplies reset data into store
export const storeNextSuppliesRequestReset = () => ({
    type: STORE_NEXT_SUPPLIES_REQUEST_RESET
});
// ======================================================== Show supply
// Set show supply init data into store
export const storeShowSupplyRequestInit = () => ({
    type: STORE_SHOW_SUPPLY_REQUEST_INIT
});

// Set show supply failed data into store
export const storeShowSupplyRequestFailed = ({message}) => ({
    message,
    type: STORE_SHOW_SUPPLY_REQUEST_FAILED
});

// Set show supply succeeded data into store
export const storeShowSupplyRequestSucceed = ({message}) => ({
    message,
    type: STORE_SHOW_SUPPLY_REQUEST_SUCCEEDED
});

// Set show supply reset data into store
export const storeShowSupplyRequestReset = () => ({
    type: STORE_SHOW_SUPPLY_REQUEST_RESET
});