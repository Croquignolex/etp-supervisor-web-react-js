// Reducer action types
export const STORE_ACCOUNTANTS_REQUEST_INIT = 'STORE_ACCOUNTANTS_REQUEST_INIT';
export const STORE_ACCOUNTANTS_REQUEST_RESET = 'STORE_ACCOUNTANTS_REQUEST_RESET';
export const STORE_ACCOUNTANTS_REQUEST_FAILED = 'STORE_ACCOUNTANTS_REQUEST_FAILED';
export const STORE_ACCOUNTANTS_REQUEST_SUCCEEDED = 'STORE_ACCOUNTANTS_REQUEST_SUCCEEDED';

export const STORE_NEXT_ACCOUNTANTS_REQUEST_INIT = 'STORE_NEXT_ACCOUNTANTS_REQUEST_INIT';
export const STORE_NEXT_ACCOUNTANTS_REQUEST_RESET = 'STORE_NEXT_ACCOUNTANTS_REQUEST_RESET';
export const STORE_NEXT_ACCOUNTANTS_REQUEST_FAILED = 'STORE_NEXT_ACCOUNTANTS_REQUEST_FAILED';
export const STORE_NEXT_ACCOUNTANTS_REQUEST_SUCCEEDED = 'STORE_NEXT_ACCOUNTANTS_REQUEST_SUCCEEDED';

export const STORE_ALL_ACCOUNTANTS_REQUEST_INIT = 'STORE_ALL_ACCOUNTANTS_REQUEST_INIT';
export const STORE_ALL_ACCOUNTANTS_REQUEST_RESET = 'STORE_ALL_ACCOUNTANTS_REQUEST_RESET';
export const STORE_ALL_ACCOUNTANTS_REQUEST_FAILED = 'STORE_ALL_ACCOUNTANTS_REQUEST_FAILED';
export const STORE_ALL_ACCOUNTANTS_REQUEST_SUCCEEDED = 'STORE_ALL_ACCOUNTANTS_REQUEST_SUCCEEDED';

export const STORE_ADD_ACCOUNTANT_REQUEST_INIT = 'STORE_ADD_ACCOUNTANT_REQUEST_INIT';
export const STORE_ADD_ACCOUNTANT_REQUEST_RESET = 'STORE_ADD_ACCOUNTANT_REQUEST_RESET';
export const STORE_ADD_ACCOUNTANT_REQUEST_FAILED = 'STORE_ADD_ACCOUNTANT_REQUEST_FAILED';
export const STORE_ADD_ACCOUNTANT_REQUEST_SUCCEEDED = 'STORE_ADD_ACCOUNTANT_REQUEST_SUCCEEDED';

export const STORE_ACCOUNTANT_REQUEST_INIT = 'STORE_ACCOUNTANT_REQUEST_INIT';
export const STORE_ACCOUNTANT_REQUEST_RESET = 'STORE_ACCOUNTANT_REQUEST_RESET';
export const STORE_ACCOUNTANT_REQUEST_FAILED = 'STORE_ACCOUNTANT_REQUEST_FAILED';
export const STORE_ACCOUNTANT_REQUEST_SUCCEEDED = 'STORE_ACCOUNTANT_REQUEST_SUCCEEDED';

export const STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_INIT = 'STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_INIT';
export const STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_RESET = 'STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_RESET';
export const STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_FAILED = 'STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_FAILED';
export const STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_SUCCEEDED = 'STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_SUCCEEDED';

export const STORE_ACCOUNTANT_EDIT_INFO_REQUEST_INIT = 'STORE_ACCOUNTANT_EDIT_INFO_REQUEST_INIT';
export const STORE_ACCOUNTANT_EDIT_INFO_REQUEST_RESET = 'STORE_ACCOUNTANT_EDIT_INFO_REQUEST_RESET';
export const STORE_ACCOUNTANT_EDIT_INFO_REQUEST_FAILED = 'STORE_ACCOUNTANT_EDIT_INFO_REQUEST_FAILED';
export const STORE_ACCOUNTANT_EDIT_INFO_REQUEST_SUCCEEDED = 'STORE_ACCOUNTANT_EDIT_INFO_REQUEST_SUCCEEDED';

// ======================================================== Accounts
// Set accounts init data into store
export const storeAccountsRequestInit = () => ({
    type: STORE_ACCOUNTANTS_REQUEST_INIT
});

// Set accounts failed data into store
export const storeAccountsRequestFailed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANTS_REQUEST_FAILED
});

// Set accounts succeeded data into store
export const storeAccountsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANTS_REQUEST_SUCCEEDED
});

// Set accounts reset data into store
export const storeAccountsRequestReset = () => ({
    type: STORE_ACCOUNTANTS_REQUEST_RESET
});
// ======================================================== Next accounts
// Set next accounts init data into store
export const storeNextAccountsRequestInit = () => ({
    type: STORE_NEXT_ACCOUNTANTS_REQUEST_INIT
});

// Set next accounts failed data into store
export const storeNextAccountsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_ACCOUNTANTS_REQUEST_FAILED
});

// Set next accounts succeeded data into store
export const storeNextAccountsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_ACCOUNTANTS_REQUEST_SUCCEEDED
});

// Set next accounts reset data into store
export const storeNextAccountsRequestReset = () => ({
    type: STORE_NEXT_ACCOUNTANTS_REQUEST_RESET
});
// ======================================================== All accounts
// Set all accounts init data into store
export const storeAllAccountsRequestInit = () => ({
    type: STORE_ALL_ACCOUNTANTS_REQUEST_INIT
});

// Set all accounts failed data into store
export const storeAllAccountsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_ACCOUNTANTS_REQUEST_FAILED
});

// Set all accounts succeeded data into store
export const storeAllAccountsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_ACCOUNTANTS_REQUEST_SUCCEEDED
});

// Set all accounts reset data into store
export const storeAllAccountsRequestReset = () => ({
    type: STORE_ALL_ACCOUNTANTS_REQUEST_RESET
});
// ======================================================== Add account
// Set add account init data into store
export const storeAddAccountRequestInit = () => ({
    type: STORE_ADD_ACCOUNTANT_REQUEST_INIT
});

// Set add account failed data into store
export const storeAddAccountRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_ACCOUNTANT_REQUEST_FAILED
});

// Set add account succeeded data into store
export const storeAddAccountRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_ACCOUNTANT_REQUEST_SUCCEEDED
});

// Set add account reset data into store
export const storeAddAccountRequestReset = () => ({
    type: STORE_ADD_ACCOUNTANT_REQUEST_RESET
});
// ======================================================== Account
// Set account init data into store
export const storeAccountRequestInit = () => ({
    type: STORE_ACCOUNTANT_REQUEST_INIT
});

// Set account failed data into store
export const storeAccountRequestFailed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANT_REQUEST_FAILED
});

// Set account succeeded data into store
export const storeAccountRequestSucceed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANT_REQUEST_SUCCEEDED
});

// Set account reset data into store
export const storeAccountRequestReset = () => ({
    type: STORE_ACCOUNTANT_REQUEST_RESET
});
// ======================================================== Account status toggle
// Set account status toggle init data into store
export const storeAccountStatusToggleRequestInit = () => ({
    type: STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_INIT
});

// Set account status toggle failed data into store
export const storeAccountStatusToggleRequestFailed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_FAILED
});

// Set account status toggle succeeded data into store
export const storeAccountStatusToggleRequestSucceed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_SUCCEEDED
});

// Set account status toggle reset data into store
export const storeAccountStatusToggleRequestReset = () => ({
    type: STORE_ACCOUNTANT_STATUS_TOGGLE_REQUEST_RESET
});
// ======================================================== Account edit info
// Set account edit info init data into store
export const storeAccountEditInfoRequestInit = () => ({
    type: STORE_ACCOUNTANT_EDIT_INFO_REQUEST_INIT
});

// Set account edit info failed data into store
export const storeAccountEditInfoRequestFailed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANT_EDIT_INFO_REQUEST_FAILED
});

// Set account edit info succeeded data into store
export const storeAccountEditInfoRequestSucceed = ({message}) => ({
    message,
    type: STORE_ACCOUNTANT_EDIT_INFO_REQUEST_SUCCEEDED
});

// Set account edit info reset data into store
export const storeAccountEditInfoRequestReset = () => ({
    type: STORE_ACCOUNTANT_EDIT_INFO_REQUEST_RESET
});