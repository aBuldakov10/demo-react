const namespace = 'ORDERS';
const orders = '_ORDERS';
const edit = '_EDIT';
const pagination = '_PAGINATION';

export const SORT_ORDERS = `${namespace}${orders}_SORT`;
export const SET_ORDERS = `${namespace}${orders}_SET`;
export const SET_ACTIVE_ORDERS = `${namespace}${orders}_SET_ACTIVE`;

export const OPEN_EDIT_ORDER_POPUP = `${namespace}${edit}_OPEN_POPUP`;
export const CLOSE_EDIT_ORDER_POPUP = `${namespace}${edit}_CLOSE_POPUP`;

export const PAGINATION = `${namespace}${pagination}`;
export const PAGINATION_ACTIVE_PAGE = `${namespace}${pagination}_ACTIVE_PAGE`;
