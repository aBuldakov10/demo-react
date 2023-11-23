const namespace = 'ORDERS';
const orders = '_ORDERS';
const pagination = '_PAGINATION';

export const SET_ORDERS = `${namespace}${orders}_SET`;
export const SET_ACTIVE_ORDERS = `${namespace}${orders}_SET_ACTIVE`;

export const PAGINATION_ADD = `${namespace}${pagination}_ADD`;
export const PAGINATION_REMOVE = `${namespace}${pagination}_REMOVE`;
export const PAGINATION_ACTIVE_PAGE = `${namespace}${pagination}_ACTIVE_PAGE`;
