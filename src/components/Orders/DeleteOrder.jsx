import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Files
import { deleteOrder } from './index';

// Store
import {
  closeDeleteOrderPopup,
  setOrdersList,
  setActiveOrders,
  selectAll,
  pagination,
} from '../../store/orders/action';
import { deleteOrderPopupSelector, deleteOrderSelectedAll } from '../../store/orders/selectors';

const DeleteOrder = () => {
  const dispatch = useDispatch();
  const selectedOrders = useSelector(deleteOrderSelectedAll); // selected orders for delete
  const popupState = useSelector(deleteOrderPopupSelector);

  /*** Handlers ***/
  const handleCloseDeleteOrderPopup = () => dispatch(closeDeleteOrderPopup());
  const handleDeleteOrder = () => {
    const deleteOrderData = deleteOrder(selectedOrders); // объект всех заказов после удаления заказов

    dispatch(setOrdersList(deleteOrderData)); // закинуть в store все заказы
    dispatch(setActiveOrders(deleteOrderData[1])); // закинуть в store активные заказы
    dispatch(selectAll([])); // очистить массив выбранных заказов для удаления

    // Обновить пагинацию
    Object.keys(deleteOrderData).length > 1
      ? dispatch(pagination(Object.keys(deleteOrderData).length))
      : dispatch(pagination(1));

    handleCloseDeleteOrderPopup(); // close popup
  };

  return (
    <Dialog
      classes={{ paper: 'delete-popup' }}
      open={popupState}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleCloseDeleteOrderPopup}
    >
      <DialogTitle id="alert-dialog-title" sx={{ px: 0, pt: 0 }}>
        Delete order
      </DialogTitle>

      <DialogContent className="add-popup__content">
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete orders? The following orders will be deleted:{' '}
          {selectedOrders.map((orderId, index) => {
            const idSeparator = selectedOrders.length - 1 === index ? '' : ', ';

            return (
              <strong key={index}>
                {orderId}
                {idSeparator}
              </strong>
            );
          })}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="delete" title="delete" className="btn" onClick={handleDeleteOrder}>
          delete
        </Button>

        <Button variant="contained" color="custom" title="cancel" className="btn" onClick={handleCloseDeleteOrderPopup}>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteOrder;
