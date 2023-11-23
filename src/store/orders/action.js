import { PAGINATION_ACTIVE_PAGE, PAGINATION_ADD, PAGINATION_REMOVE, SET_ACTIVE_ORDERS, SET_ORDERS } from './types';

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
export const addPagination = (countPages) => {
  return {
    type: PAGINATION_ADD,
    countPages: countPages,
  };
};

export const removePagination = () => {
  return {
    type: PAGINATION_REMOVE,
  };
};

export const changePaginationPage = (pageNumber) => {
  return {
    type: PAGINATION_ACTIVE_PAGE,
    pageNumber: pageNumber,
  };
};
