// Reducer action types
export const STORE_SET_OPERATORS_DATA = 'STORE_SET_OPERATORS_DATA';

// Middleware action types
export const EMIT_OPERATOR_FETCH = 'EMIT_OPERATOR_FETCH';
export const EMIT_OPERATORS_FETCH = 'EMIT_OPERATORS_FETCH';
export const EMIT_ALL_OPERATORS_FETCH = 'EMIT_ALL_OPERATORS_FETCH';
export const EMIT_NEXT_OPERATORS_FETCH = 'EMIT_NEXT_OPERATORS_FETCH';

//====================== Reducer trigger actions
// Set operators data in store
export const storeSetOperatorsData = ({operators, hasMoreData, page}) => ({
    page,
    operators,
    hasMoreData,
    type: STORE_SET_OPERATORS_DATA
});

//====================== Middleware trigger actions
// Emit operators fetch
export const emitOperatorsFetch = () => ({
    type: EMIT_OPERATORS_FETCH
});

// Emit next operators fetch
export const emitNextOperatorsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_OPERATORS_FETCH
});

// Emit all operators fetch
export const emitAllOperatorsFetch = () => ({
    type: EMIT_ALL_OPERATORS_FETCH
});

// Emit operator fetch
export const emitOperatorFetch = ({id}) => ({
    id,
    type: EMIT_OPERATOR_FETCH
});