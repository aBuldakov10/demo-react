const namespace = 'ORDERS';
const orders = '_ORDERS';
const edit = '_EDIT';
const add = '_ADD';
const pagination = '_PAGINATION';

// Orders
export const SORT_ORDERS = `${namespace}${orders}_SORT`;
export const SET_ORDERS = `${namespace}${orders}_SET`;
export const SET_ACTIVE_ORDERS = `${namespace}${orders}_SET_ACTIVE`;

// Add
export const ADD_OPEN_ORDER_POPUP = `${namespace}${add}_OPEN_POPUP`;
export const ADD_CLOSE_ORDER_POPUP = `${namespace}${add}_CLOSE_POPUP`;

// Edit
export const EDIT_OPEN_ORDER_POPUP = `${namespace}${edit}_OPEN_POPUP`;
export const EDIT_CLOSE_ORDER_POPUP = `${namespace}${edit}_CLOSE_POPUP`;

// Pagination
export const PAGINATION = `${namespace}${pagination}`;
export const PAGINATION_ACTIVE_PAGE = `${namespace}${pagination}_ACTIVE_PAGE`;
