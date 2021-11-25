// Reducer action types
export const STORE_RESOURCES_REQUEST_INIT = 'STORE_RESOURCES_REQUEST_INIT';
export const STORE_RESOURCES_REQUEST_RESET = 'STORE_RESOURCES_REQUEST_RESET';
export const STORE_RESOURCES_REQUEST_FAILED = 'STORE_RESOURCES_REQUEST_FAILED';
export const STORE_RESOURCES_REQUEST_SUCCEEDED = 'STORE_RESOURCES_REQUEST_SUCCEEDED';

export const STORE_NEXT_RESOURCES_REQUEST_INIT = 'STORE_NEXT_RESOURCES_REQUEST_INIT';
export const STORE_NEXT_RESOURCES_REQUEST_RESET = 'STORE_NEXT_RESOURCES_REQUEST_RESET';
export const STORE_NEXT_RESOURCES_REQUEST_FAILED = 'STORE_NEXT_RESOURCES_REQUEST_FAILED';
export const STORE_NEXT_RESOURCES_REQUEST_SUCCEEDED = 'STORE_NEXT_RESOURCES_REQUEST_SUCCEEDED';

export const STORE_ALL_RESOURCES_REQUEST_INIT = 'STORE_ALL_RESOURCES_REQUEST_INIT';
export const STORE_ALL_RESOURCES_REQUEST_RESET = 'STORE_ALL_RESOURCES_REQUEST_RESET';
export const STORE_ALL_RESOURCES_REQUEST_FAILED = 'STORE_ALL_RESOURCES_REQUEST_FAILED';
export const STORE_ALL_RESOURCES_REQUEST_SUCCEEDED = 'STORE_ALL_RESOURCES_REQUEST_SUCCEEDED';

export const STORE_ADD_RESOURCE_REQUEST_INIT = 'STORE_ADD_RESOURCE_REQUEST_INIT';
export const STORE_ADD_RESOURCE_REQUEST_RESET = 'STORE_ADD_RESOURCE_REQUEST_RESET';
export const STORE_ADD_RESOURCE_REQUEST_FAILED = 'STORE_ADD_RESOURCE_REQUEST_FAILED';
export const STORE_ADD_RESOURCE_REQUEST_SUCCEEDED = 'STORE_ADD_RESOURCE_REQUEST_SUCCEEDED';

export const STORE_RESOURCE_REQUEST_INIT = 'STORE_RESOURCE_REQUEST_INIT';
export const STORE_RESOURCE_REQUEST_RESET = 'STORE_RESOURCE_REQUEST_RESET';
export const STORE_RESOURCE_REQUEST_FAILED = 'STORE_RESOURCE_REQUEST_FAILED';
export const STORE_RESOURCE_REQUEST_SUCCEEDED = 'STORE_RESOURCE_REQUEST_SUCCEEDED';

export const STORE_RESOURCE_STATUS_TOGGLE_REQUEST_INIT = 'STORE_RESOURCE_STATUS_TOGGLE_REQUEST_INIT';
export const STORE_RESOURCE_STATUS_TOGGLE_REQUEST_RESET = 'STORE_RESOURCE_STATUS_TOGGLE_REQUEST_RESET';
export const STORE_RESOURCE_STATUS_TOGGLE_REQUEST_FAILED = 'STORE_RESOURCE_STATUS_TOGGLE_REQUEST_FAILED';
export const STORE_RESOURCE_STATUS_TOGGLE_REQUEST_SUCCEEDED = 'STORE_RESOURCE_STATUS_TOGGLE_REQUEST_SUCCEEDED';

export const STORE_RESOURCE_EDIT_INFO_REQUEST_INIT = 'STORE_RESOURCE_EDIT_INFO_REQUEST_INIT';
export const STORE_RESOURCE_EDIT_INFO_REQUEST_RESET = 'STORE_RESOURCE_EDIT_INFO_REQUEST_RESET';
export const STORE_RESOURCE_EDIT_INFO_REQUEST_FAILED = 'STORE_RESOURCE_EDIT_INFO_REQUEST_FAILED';
export const STORE_RESOURCE_EDIT_INFO_REQUEST_SUCCEEDED = 'STORE_RESOURCE_EDIT_INFO_REQUEST_SUCCEEDED';

// ======================================================== Resources
// Set resources init data into store
export const storeResourcesRequestInit = () => ({
    type: STORE_RESOURCES_REQUEST_INIT
});

// Set resources failed data into store
export const storeResourcesRequestFailed = ({message}) => ({
    message,
    type: STORE_RESOURCES_REQUEST_FAILED
});

// Set resources succeeded data into store
export const storeResourcesRequestSucceed = ({message}) => ({
    message,
    type: STORE_RESOURCES_REQUEST_SUCCEEDED
});

// Set resources reset data into store
export const storeResourcesRequestReset = () => ({
    type: STORE_RESOURCES_REQUEST_RESET
});
// ======================================================== Next resources
// Set next resources init data into store
export const storeNextResourcesRequestInit = () => ({
    type: STORE_NEXT_RESOURCES_REQUEST_INIT
});

// Set next resources failed data into store
export const storeNextResourcesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_RESOURCES_REQUEST_FAILED
});

// Set next resources succeeded data into store
export const storeNextResourcesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_RESOURCES_REQUEST_SUCCEEDED
});

// Set next resources reset data into store
export const storeNextResourcesRequestReset = () => ({
    type: STORE_NEXT_RESOURCES_REQUEST_RESET
});
// ======================================================== All resources
// Set all resources init data into store
export const storeAllResourcesRequestInit = () => ({
    type: STORE_ALL_RESOURCES_REQUEST_INIT
});

// Set all resources failed data into store
export const storeAllResourcesRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_RESOURCES_REQUEST_FAILED
});

// Set all resources succeeded data into store
export const storeAllResourcesRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_RESOURCES_REQUEST_SUCCEEDED
});

// Set all resources reset data into store
export const storeAllResourcesRequestReset = () => ({
    type: STORE_ALL_RESOURCES_REQUEST_RESET
});
// ======================================================== Add resource
// Set add resource init data into store
export const storeAddResourceRequestInit = () => ({
    type: STORE_ADD_RESOURCE_REQUEST_INIT
});

// Set add resource failed data into store
export const storeAddResourceRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_RESOURCE_REQUEST_FAILED
});

// Set add resource succeeded data into store
export const storeAddResourceRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_RESOURCE_REQUEST_SUCCEEDED
});

// Set add resource reset data into store
export const storeAddResourceRequestReset = () => ({
    type: STORE_ADD_RESOURCE_REQUEST_RESET
});
// ======================================================== Resource
// Set resource init data into store
export const storeResourceRequestInit = () => ({
    type: STORE_RESOURCE_REQUEST_INIT
});

// Set resource failed data into store
export const storeResourceRequestFailed = ({message}) => ({
    message,
    type: STORE_RESOURCE_REQUEST_FAILED
});

// Set resource succeeded data into store
export const storeResourceRequestSucceed = ({message}) => ({
    message,
    type: STORE_RESOURCE_REQUEST_SUCCEEDED
});

// Set resource reset data into store
export const storeResourceRequestReset = () => ({
    type: STORE_RESOURCE_REQUEST_RESET
});
// ======================================================== Resource status toggle
// Set resource status toggle init data into store
export const storeResourceStatusToggleRequestInit = () => ({
    type: STORE_RESOURCE_STATUS_TOGGLE_REQUEST_INIT
});

// Set resource status toggle failed data into store
export const storeResourceStatusToggleRequestFailed = ({message}) => ({
    message,
    type: STORE_RESOURCE_STATUS_TOGGLE_REQUEST_FAILED
});

// Set resource status toggle succeeded data into store
export const storeResourceStatusToggleRequestSucceed = ({message}) => ({
    message,
    type: STORE_RESOURCE_STATUS_TOGGLE_REQUEST_SUCCEEDED
});

// Set resource status toggle reset data into store
export const storeResourceStatusToggleRequestReset = () => ({
    type: STORE_RESOURCE_STATUS_TOGGLE_REQUEST_RESET
});
// ======================================================== Resource edit info
// Set resource edit info init data into store
export const storeResourceEditInfoRequestInit = () => ({
    type: STORE_RESOURCE_EDIT_INFO_REQUEST_INIT
});

// Set resource edit info failed data into store
export const storeResourceEditInfoRequestFailed = ({message}) => ({
    message,
    type: STORE_RESOURCE_EDIT_INFO_REQUEST_FAILED
});

// Set resource edit info succeeded data into store
export const storeResourceEditInfoRequestSucceed = ({message}) => ({
    message,
    type: STORE_RESOURCE_EDIT_INFO_REQUEST_SUCCEEDED
});

// Set resource edit info reset data into store
export const storeResourceEditInfoRequestReset = () => ({
    type: STORE_RESOURCE_EDIT_INFO_REQUEST_RESET
});
