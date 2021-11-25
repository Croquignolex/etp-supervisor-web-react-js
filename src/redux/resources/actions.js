// Reducer action types
export const STORE_SET_RESOURCE_DATA = 'STORE_SET_RESOURCE_DATA';
export const STORE_SET_RESOURCES_DATA = 'STORE_SET_RESOURCES_DATA';
export const STORE_SET_NEW_RESOURCE_DATA = 'STORE_SET_NEW_RESOURCE_DATA';
export const STORE_SET_NEXT_RESOURCES_DATA = 'STORE_SET_NEXT_RESOURCES_DATA';
export const STORE_SET_RESOURCE_ACTION_DATA = 'STORE_SET_RESOURCE_ACTION_DATA';
export const STORE_SET_RESOURCE_TOGGLE_DATA = 'STORE_SET_RESOURCE_TOGGLE_DATA';
export const STORE_STOP_INFINITE_SCROLL_RESOURCES_DATA = 'STORE_STOP_INFINITE_SCROLL_RESOURCES_DATA';

// Middleware action types
export const EMIT_NEW_RESOURCE = 'EMIT_NEW_RESOURCE';
export const EMIT_RESOURCE_FETCH = 'EMIT_RESOURCE_FETCH';
export const EMIT_RESOURCES_FETCH = 'EMIT_RESOURCES_FETCH';
export const EMIT_NEXT_RESOURCES_FETCH = 'EMIT_NEXT_SIMS_FETCH';
export const EMIT_ALL_RESOURCES_FETCH = 'EMIT_ALL_RESOURCES_FETCH';
export const EMIT_UPDATE_RESOURCE_INFO = 'EMIT_UPDATE_RESOURCE_INFO';
export const EMIT_SEARCH_RESOURCES_FETCH = 'EMIT_SEARCH_RESOURCES_FETCH';
export const EMIT_TOGGLE_RESOURCE_STATUS = 'EMIT_TOGGLE_RESOURCE_STATUS';

//====================== Reducer trigger actions
// Set resources data in store
export const storeSetResourcesData = ({resources, hasMoreData, page}) => ({
    page,
    resources,
    hasMoreData,
    type: STORE_SET_RESOURCES_DATA
});

// Set new resource data in store
export const storeSetNewResourceData = ({resource}) => ({
    resource,
    type: STORE_SET_NEW_RESOURCE_DATA
});

// Set resource data in store
export const storeSetResourceData = ({resource, alsoInList = false}) => ({
    resource,
    alsoInList,
    type: STORE_SET_RESOURCE_DATA
});

// Set next resources data in store
export const storeSetNextResourcesData = ({resources, hasMoreData, page}) => ({
    page,
    resources,
    hasMoreData,
    type: STORE_SET_NEXT_RESOURCES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollResourceData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_RESOURCES_DATA
});

// Set sim action data in store
export const storeSetResourceActionData = ({id}) => ({
    id,
    type: STORE_SET_RESOURCE_ACTION_DATA
});

// Set resource toggle data in store
export const storeSetResourceToggleData = ({id}) => ({
    id,
    type: STORE_SET_RESOURCE_TOGGLE_DATA
});

//====================== Middleware trigger actions
// Emit resources fetch
export const emitResourcesFetch = () => ({
    type: EMIT_RESOURCES_FETCH
});

// Emit search resources fetch
export const emitSearchResourcesFetch = ({needle}) => ({
    needle,
    type: EMIT_SEARCH_RESOURCES_FETCH
});

// Emit next resources fetch
export const emitNextResourcesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_RESOURCES_FETCH
});

// Emit all resources fetch
export const emitAllResourcesFetch = () => ({
    type: EMIT_ALL_RESOURCES_FETCH
});

// Emit resource fetch
export const emitResourceFetch = ({id}) => ({
    id,
    type: EMIT_RESOURCE_FETCH
});

// Emit toggle resource status
export const emitToggleResourceStatus = ({id}) => ({
    id,
    type: EMIT_TOGGLE_RESOURCE_STATUS
});

// Emit new resource fetch
export const emitNewResource = ({name, address, phone, email, description}) => ({
    name,
    phone,
    email,
    address,
    description,
    type: EMIT_NEW_RESOURCE
});

// Emit update resource info
export const emitUpdateResourceInfo = ({id, email, name, address, description}) => ({
    id,
    name,
    email,
    address,
    description,
    type: EMIT_UPDATE_RESOURCE_INFO
});
