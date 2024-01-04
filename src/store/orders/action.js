import {
  PAGINATION_ACTIVE_PAGE,
  PAGINATION,
  SET_ACTIVE_ORDERS,
  SET_ORDERS,
  SORT_ORDERS,
  EDIT_OPEN_ORDER_POPUP,
  EDIT_CLOSE_ORDER_POPUP,
  ADD_OPEN_ORDER_POPUP,
  ADD_CLOSE_ORDER_POPUP,
} from './types';

// Sort
export const sortOrders = (by = '', direction = '') => {
  return {
    type: SORT_ORDERS,
    by,
    direction,
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

// Edit orders
export const openEditOrderPopup = (orderId, clientName = '', clientMail = '') => {
  return {
    type: EDIT_OPEN_ORDER_POPUP,
    orderId,
    clientName,
    clientMail,
  };
};

export const closeEditOrderPopup = () => {
  return {
    type: EDIT_CLOSE_ORDER_POPUP,
  };
};

// Add orders
export const openAddOrderPopup = () => {
  return {
    type: ADD_OPEN_ORDER_POPUP,
  };
};

export const closeAddOrderPopup = () => {
  return {
    type: ADD_CLOSE_ORDER_POPUP,
  };
};

// Pagination
export const pagination = (countPages) => {
  return {
    type: PAGINATION,
    countPages,
  };
};

export const changePaginationPage = (pageNumber) => {
  return {
    type: PAGINATION_ACTIVE_PAGE,
    pageNumber,
  };
};
