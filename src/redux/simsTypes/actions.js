// Reducer action types
export const STORE_SET_COMPANIES_DATA = 'STORE_SET_COMPANIES_DATA';

// Middleware action types
export const EMIT_ALL_COMPANIES_FETCH = 'EMIT_ALL_COMPANIES_FETCH';

//====================== Reducer trigger actions
// Set companies data in store
export const storeSetCompaniesData = ({companies, hasMoreData, page}) => ({
    page,
    companies,
    hasMoreData,
    type: STORE_SET_COMPANIES_DATA
});

//====================== Middleware trigger actions
// Emit all companies fetch
export const emitAllCompaniesFetch = () => ({
    type: EMIT_ALL_COMPANIES_FETCH
});