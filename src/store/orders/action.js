import { PAGINATION_ACTIVE_PAGE, PAGINATION, SET_ACTIVE_ORDERS, SET_ORDERS, SORT_ORDERS } from './types';

// Sort
export const sortOrders = (by = '', direction = '') => {
  return {
    type: SORT_ORDERS,
    by: by,
    direction: direction,
  };
};

// Orders
export const setOrdersList = (ordersList) => {
  return {
    type: SET_ORDERS,
    list: ordersList,
  };
};

export const setActiveOrders = (activeOrders) => {
  return {
    type: SET_ACTIVE_ORDERS,
    listActive: activeOrders,
  };
};

// Pagination
export const pagination = (countPages) => {
  return {
    type: PAGINATION,
    countPages: countPages,
  };
};

export const changePaginationPage = (pageNumber) => {
  return {
    type: PAGINATION_ACTIVE_PAGE,
    pageNumber: pageNumber,
  };
};
