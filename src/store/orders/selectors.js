// Get sorted type data
export const sortedSelector = ({ orders }) => {
  return orders.sortedBy;
};

// Get active orders block
export const activeOrdersSelector = ({ orders }) => {
  return orders.activeOrders;
};

// Get pagination state
export const paginationStateSelector = ({ orders }) => {
  return orders.pagination.state;
};

// Get active page number
export const activePageSelector = ({ orders }) => {
  return orders.pagination.activePage;
};

// Count pagination pages
export const paginationPagesSelector = ({ orders }) => {
  return orders.pagination.count;
};
