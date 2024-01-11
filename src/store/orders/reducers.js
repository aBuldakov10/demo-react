import {
  SET_ORDERS,
  SET_ACTIVE_ORDERS,
  SEARCH_ORDER,
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

const initialOrderState = {
  ordersList: {},
  activeOrders: [],
  sortedBy: {
    id: false,
    title: false,
    client: false,
    date: false,
    sum: false,
  },
  search: {
    state: false,
    request: '',
  },
  addOrder: {
    isOpen: false,
  },
  editOrder: {
    id: null,
    userName: null,
    userMail: null,
    isOpen: false,
  },
  deleteOrder: {
    isOpen: false,
    selected: [],
  },
  pagination: {
    state: false,
    activePage: null,
    count: null,
  },
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

  // search
  if (action.type === SEARCH_ORDER) {
    return {
      ...state,
      search: {
        ...state.search,
        state: !!action.searchRequest?.searchOrder,
        request: action.searchRequest?.searchOrder,
      },
    };
  }

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

  // add orders
  if (action.type === ADD_OPEN_ORDER_POPUP) {
    return {
      ...state,
      addOrder: {
        isOpen: true,
      },
    };
  }

  if (action.type === ADD_CLOSE_ORDER_POPUP) {
    return {
      ...state,
      addOrder: {
        isOpen: false,
      },
    };
  }

  // edit
  if (action.type === EDIT_OPEN_ORDER_POPUP) {
    return {
      ...state,
      editOrder: {
        id: action.orderId,
        userName: action.clientName,
        userMail: action.clientMail,
        isOpen: true,
      },
    };
  }

  if (action.type === EDIT_CLOSE_ORDER_POPUP) {
    return {
      ...state,
      editOrder: {
        id: null,
        userName: null,
        userMail: null,
        isOpen: false,
      },
    };
  }

  // delete orders
  if (action.type === DELETE_OPEN_ORDER_POPUP) {
    return {
      ...state,
      deleteOrder: {
        ...state.deleteOrder,
        isOpen: true,
      },
    };
  }

  if (action.type === DELETE_CLOSE_ORDER_POPUP) {
    return {
      ...state,
      deleteOrder: {
        ...state.deleteOrder,
        isOpen: false,
      },
    };
  }

  if (action.type === DELETE_SELECT_ALL_ORDERS) {
    return {
      ...state,
      deleteOrder: {
        ...state.deleteOrder,
        selected: action.selectedArr,
      },
    };
  }

  // pagination
  if (action.type === PAGINATION) {
    if (action.countPages > 1) {
      return {
        ...state,
        pagination: {
          state: true,
          activePage: 1,
          count: action.countPages,
        },
      };
    } else {
      return {
        ...state,
        pagination: {
          state: false,
          activePage: null,
          count: null,
        },
      };
    }
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
