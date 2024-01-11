const namespace = 'ORDERS';
const orders = '_ORDERS';
const search = '_SEARCH';
const add = '_ADD';
const edit = '_EDIT';
const remove = '_DELETE';
const pagination = '_PAGINATION';

// Orders
export const SET_ORDERS = `${namespace}${orders}_SET`;
export const SET_ACTIVE_ORDERS = `${namespace}${orders}_SET_ACTIVE`;
export const SORT_ORDERS = `${namespace}${orders}_SORT`;

// Search
export const SEARCH_ORDER = `${namespace}${search}_SEARCH`;

// Add
export const ADD_OPEN_ORDER_POPUP = `${namespace}${add}_OPEN_POPUP`;
export const ADD_CLOSE_ORDER_POPUP = `${namespace}${add}_CLOSE_POPUP`;

// Edit
export const EDIT_OPEN_ORDER_POPUP = `${namespace}${edit}_OPEN_POPUP`;
export const EDIT_CLOSE_ORDER_POPUP = `${namespace}${edit}_CLOSE_POPUP`;

// Delete
export const DELETE_OPEN_ORDER_POPUP = `${namespace}${remove}_OPEN_POPUP`;
export const DELETE_CLOSE_ORDER_POPUP = `${namespace}${remove}_CLOSE_POPUP`;
export const DELETE_SELECT_ALL_ORDERS = `${namespace}${remove}_SELECT_ALL`;

// Pagination
export const PAGINATION = `${namespace}${pagination}`;
export const PAGINATION_ACTIVE_PAGE = `${namespace}${pagination}_ACTIVE_PAGE`;
