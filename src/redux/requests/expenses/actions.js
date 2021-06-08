// Reducer action types
export const STORE_EXPENSES_REQUEST_INIT = 'STORE_EXPENSES_REQUEST_INIT';
export const STORE_EXPENSES_REQUEST_RESET = 'STORE_EXPENSES_REQUEST_RESET';
export const STORE_EXPENSES_REQUEST_FAILED = 'STORE_EXPENSES_REQUEST_FAILED';
export const STORE_EXPENSES_REQUEST_SUCCEEDED = 'STORE_EXPENSES_REQUEST_SUCCEEDED';

export const STORE_NEXT_EXPENSES_REQUEST_INIT = 'STORE_NEXT_EXPENSES_REQUEST_INIT';
export const STORE_NEXT_EXPENSES_REQUEST_RESET = 'STORE_NEXT_EXPENSES_REQUEST_RESET';
export const STORE_NEXT_EXPENSES_REQUEST_FAILED = 'STORE_NEXT_EXPENSES_REQUEST_FAILED';
export const STORE_NEXT_EXPENSES_REQUEST_SUCCEEDED = 'STORE_NEXT_EXPENSES_REQUEST_SUCCEEDED';

export const STORE_ADD_EXPENSE_REQUEST_INIT = 'STORE_ADD_EXPENSE_REQUEST_INIT';
export const STORE_ADD_EXPENSE_REQUEST_RESET = 'STORE_ADD_EXPENSE_REQUEST_RESET';
export const STORE_ADD_EXPENSE_REQUEST_FAILED = 'STORE_ADD_EXPENSE_REQUEST_FAILED';
export const STORE_ADD_EXPENSE_REQUEST_SUCCEEDED = 'STORE_ADD_EXPENSE_REQUEST_SUCCEEDED';

// ======================================================== Expenses
// Set expenses init data into store
export const storeExpensesRequestInit = () => ({
    type: STORE_EXPENSES_REQUEST_INIT
});

// Set expenses failed data into store
export const storeExpensesRequestFailed = ({message}) => ({
    message,
    type: STORE_EXPENSES_REQUEST_FAILED
});

// Set expenses succeeded data into store
export const storeExpensesRequestSucceed = ({message}) => ({
    message,
    type: STORE_EXPENSES_REQUEST_SUCCEEDED
});

// Set expenses reset data into store
export const storeExpensesRequestReset = () => ({
    type: STORE_EXPENSES_REQUEST_RESET
});
// ======================================================== Next expenses
// Set next expenses init data into store
export const storeNextExpensesRequestInit = () => ({
    type: STORE_NEXT_EXPENSES_REQUEST_INIT
});

// Set next expenses failed data into store
export const storeNextExpensesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_EXPENSES_REQUEST_FAILED
});

// Set next expenses succeeded data into store
export const storeNextExpensesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_EXPENSES_REQUEST_SUCCEEDED
});

// Set next expenses reset data into store
export const storeNextExpensesRequestReset = () => ({
    type: STORE_NEXT_EXPENSES_REQUEST_RESET
});
// ======================================================== Add expense
// Set add expense init data into store
export const storeAddExpenseRequestInit = () => ({
    type: STORE_ADD_EXPENSE_REQUEST_INIT
});

// Set add expense failed data into store
export const storeAddExpenseRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_EXPENSE_REQUEST_FAILED
});

// Set add expense succeeded data into store
export const storeAddExpenseRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_EXPENSE_REQUEST_SUCCEEDED
});

// Set add expense reset data into store
export const storeAddExpenseRequestReset = () => ({
    type: STORE_ADD_EXPENSE_REQUEST_RESET
});