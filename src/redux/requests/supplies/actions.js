// Reducer action types
export const STORE_SUPPLIES_REQUEST_INIT = 'STORE_SUPPLIES_REQUEST_INIT';
export const STORE_SUPPLIES_REQUEST_RESET = 'STORE_SUPPLIES_REQUEST_RESET';
export const STORE_SUPPLIES_REQUEST_FAILED = 'STORE_SUPPLIES_REQUEST_FAILED';
export const STORE_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_NEXT_SUPPLIES_REQUEST_INIT = 'STORE_NEXT_SUPPLIES_REQUEST_INIT';
export const STORE_NEXT_SUPPLIES_REQUEST_RESET = 'STORE_NEXT_SUPPLIES_REQUEST_RESET';
export const STORE_NEXT_SUPPLIES_REQUEST_FAILED = 'STORE_NEXT_SUPPLIES_REQUEST_FAILED';
export const STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_ADD_SUPPLY_REQUEST_INIT = 'STORE_ADD_SUPPLY_REQUEST_INIT';
export const STORE_ADD_SUPPLY_REQUEST_RESET = 'STORE_ADD_SUPPLY_REQUEST_RESET';
export const STORE_ADD_SUPPLY_REQUEST_FAILED = 'STORE_ADD_SUPPLY_REQUEST_FAILED';
export const STORE_ADD_SUPPLY_REQUEST_SUCCEEDED = 'STORE_ADD_SUPPLY_REQUEST_SUCCEEDED';

export const STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_INIT = 'STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_INIT';
export const STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_RESET = 'STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_RESET';
export const STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_FAILED = 'STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_FAILED';
export const STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_SUCCEEDED = 'STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_SUCCEEDED';

export const STORE_CANCEL_SUPPLY_REQUEST_INIT = 'STORE_CANCEL_SUPPLY_REQUEST_INIT';
export const STORE_CANCEL_SUPPLY_REQUEST_RESET = 'STORE_CANCEL_SUPPLY_REQUEST_RESET';
export const STORE_CANCEL_SUPPLY_REQUEST_FAILED = 'STORE_CANCEL_SUPPLY_REQUEST_FAILED';
export const STORE_CANCEL_SUPPLY_REQUEST_SUCCEEDED = 'STORE_CANCEL_SUPPLY_REQUEST_SUCCEEDED';

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
// ======================================================== Add supply
// Set add supply init data into store
export const storeAddSupplyRequestInit = () => ({
    type: STORE_ADD_SUPPLY_REQUEST_INIT
});

// Set add supply failed data into store
export const storeAddSupplyRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_SUPPLY_REQUEST_FAILED
});

// Set add supply succeeded data into store
export const storeAddSupplyRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_SUPPLY_REQUEST_SUCCEEDED
});

// Set add supply reset data into store
export const storeAddSupplyRequestReset = () => ({
    type: STORE_ADD_SUPPLY_REQUEST_RESET
});
// ======================================================== Add anonymous supply
// Set add anonymous supply init data into store
export const storeAddAnonymousSupplyRequestInit = () => ({
    type: STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_INIT
});

// Set add anonymous supply failed data into store
export const storeAddAnonymousSupplyRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_FAILED
});

// Set add anonymous supply succeeded data into store
export const storeAddAnonymousSupplyRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_SUCCEEDED
});

// Set add anonymous supply reset data into store
export const storeAddAnonymousSupplyRequestReset = () => ({
    type: STORE_ADD_ANONYMOUS_SUPPLY_REQUEST_RESET
});
// ======================================================== Cancel supply
// Set cancel supply init data into store
export const storeCancelSupplyRequestInit = () => ({
    type: STORE_CANCEL_SUPPLY_REQUEST_INIT
});

// Set cancel supply failed data into store
export const storeCancelSupplyRequestFailed = ({message}) => ({
    message,
    type: STORE_CANCEL_SUPPLY_REQUEST_FAILED
});

// Set cancel supply succeeded data into store
export const storeCancelSupplyRequestSucceed = ({message}) => ({
    message,
    type: STORE_CANCEL_SUPPLY_REQUEST_SUCCEEDED
});

// Set cancel supply reset data into store
export const storeCancelSupplyRequestReset = () => ({
    type: STORE_CANCEL_SUPPLY_REQUEST_RESET
});
