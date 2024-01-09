import {
  SET_ORDERS,
  SET_ACTIVE_ORDERS,
  SORT_ORDERS,
  ADD_OPEN_ORDER_POPUP,
  ADD_CLOSE_ORDER_POPUP,
  EDIT_OPEN_ORDER_POPUP,
  EDIT_CLOSE_ORDER_POPUP,
  DELETE_OPEN_ORDER_POPUP,
  DELETE_CLOSE_ORDER_POPUP,
  DELETE_SELECT_ALL_ORDERS,
  PAGINATION,
  PAGINATION_ACTIVE_PAGE,
} from './types';

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

// Sort
export const sortOrders = (by = '', direction = '') => {
  return {
    type: SORT_ORDERS,
    by,
    direction,
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

// Delete orders
export const openDeleteOrderPopup = () => {
  return {
    type: DELETE_OPEN_ORDER_POPUP,
  };
};

export const closeDeleteOrderPopup = () => {
  return {
    type: DELETE_CLOSE_ORDER_POPUP,
  };
};

export const selectAll = (selectedArr) => {
  return {
    type: DELETE_SELECT_ALL_ORDERS,
    selectedArr,
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
