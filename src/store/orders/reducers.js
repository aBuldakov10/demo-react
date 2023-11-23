import { PAGINATION_ACTIVE_PAGE, PAGINATION_ADD, PAGINATION_REMOVE, SET_ACTIVE_ORDERS, SET_ORDERS } from './types';

const initialOrderState = {
  pagination: {
    state: false,
    activePage: null,
    count: null,
  },
  ordersList: {},
  activeOrders: [],
};

export const ordersReducer = (state = initialOrderState, action) => {
  // orders
  if (action.type === SET_ORDERS) {
    return {
      ...state,
      ordersList: action.list,
    };
  }

  if (action.type === SET_ACTIVE_ORDERS) {
    return {
      ...state,
      activeOrders: action.listActive,
    };
  }

  // pagination
  if (action.type === PAGINATION_ADD) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        state: true,
        activePage: 1,
        count: action.countPages,
      },
    };
  }

  if (action.type === PAGINATION_REMOVE) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        state: false,
        activePage: null,
      },
    };
  }

  if (action.type === PAGINATION_ACTIVE_PAGE) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        activePage: action.pageNumber,
      },
    };
  }

  return state;
};
