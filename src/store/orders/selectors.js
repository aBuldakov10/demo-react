/*** Orders ***/
// Get active orders block
export const activeOrdersSelector = ({ orders }) => {
  return orders.activeOrders;
};

// Get sorted type data
export const sortedSelector = ({ orders }) => {
  return orders.sortedBy;
};

/*** Add ***/
// Add popup state
export const addOrderPopupSelector = ({ orders }) => {
  return orders.addOrder.isOpen;
};

/*** Edit ***/
// Edit orders
export const editOrderPopupSelector = ({ orders }) => {
  return {
    id: orders.editOrder.id,
    name: orders.editOrder.userName,
    email: orders.editOrder.userMail,
    state: orders.editOrder.isOpen,
  };
};

/*** Delete ***/
export const deleteOrderPopupSelector = ({ orders }) => {
  return orders.deleteOrder.isOpen;
};

export const deleteOrderSelectedAll = ({ orders }) => {
  return orders.deleteOrder.selected;
};

/*** Pagination ***/
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
