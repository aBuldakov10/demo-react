import { PAGINATION_ACTIVE_PAGE, PAGINATION, SET_ACTIVE_ORDERS, SET_ORDERS, SORT_ORDERS } from './types';

const initialOrderState = {
  pagination: {
    state: false,
    activePage: null,
    count: null,
  },
  ordersList: {},
  activeOrders: [],
  sortedBy: {
    id: false,
    title: false,
    client: false,
    date: false,
    sum: false,
  },
};

export const ordersReducer = (state = initialOrderState, action) => {
  // sort orders
  if (action.type === SORT_ORDERS) {
    if (action.by === 'id') {
      return {
        ...state,
        sortedBy: {
          id: `${action.by}-${action.direction}`,
          title: false,
          client: false,
          date: false,
          sum: false,
        },
      };
    }

    if (action.by === 'title') {
      return {
        ...state,
        sortedBy: {
          id: false,
          title: `${action.by}-${action.direction}`,
          client: false,
          date: false,
          sum: false,
        },
      };
    }

    if (action.by === 'client') {
      return {
        ...state,
        sortedBy: {
          id: false,
          title: false,
          client: `${action.by}-${action.direction}`,
          date: false,
          sum: false,
        },
      };
    }

    if (action.by === 'date') {
      return {
        ...state,
        sortedBy: {
          id: false,
          title: false,
          client: false,
          date: `${action.by}-${action.direction}`,
          sum: false,
        },
      };
    }

    if (action.by === 'sum') {
      return {
        ...state,
        sortedBy: {
          id: false,
          title: false,
          client: false,
          date: false,
          sum: `${action.by}-${action.direction}`,
        },
      };
    }

    // default
    if (action.by === '') {
      return {
        ...state,
        sortedBy: {
          id: false,
          title: false,
          client: false,
          date: false,
          sum: false,
        },
      };
    }
  }

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
  if (action.type === PAGINATION) {
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
