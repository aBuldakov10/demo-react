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
import { deleteOrderPopupSelector, deleteOrderSelectedAll, searchSelector } from '../../store/orders/selectors';

const DeleteOrder = () => {
  const dispatch = useDispatch();
  const selectedOrders = useSelector(deleteOrderSelectedAll); // selected orders for delete
  const popupState = useSelector(deleteOrderPopupSelector);
  const searchData = useSelector(searchSelector);

  /*** Handlers ***/
  const handleCloseDeleteOrderPopup = () => dispatch(closeDeleteOrderPopup());
  const handleDeleteOrder = () => {
    // удаление заказов без результатов поиска
    if (!searchData.state) {
      const deleteOrderData = deleteOrder(selectedOrders); // объект всех заказов после удаления заказов

      dispatch(setOrdersList(deleteOrderData)); // закинуть в store все заказы
      dispatch(setActiveOrders(deleteOrderData[1])); // закинуть в store активные заказы
      dispatch(selectAll([])); // очистить массив выбранных заказов для удаления

      // Обновить пагинацию
      Object.keys(deleteOrderData).length > 1
        ? dispatch(pagination(Object.keys(deleteOrderData).length))
        : dispatch(pagination(1));

      handleCloseDeleteOrderPopup(); // close popup
    }

    // удаление заказов с результатами поиска
    if (searchData.state) {
      const deleteOrderData = deleteOrder(selectedOrders); // объект всех заказов после удаления заказов
      const newSearchOrdersObj = {}; // новый объект заказов поиска
      let newSearchOrdersObjKey = 1; // первый ключ объекта заказов поиска
      let newSearchOrdersObjValue = []; // первое значение объекта заказов поиска

      // заново отфильтрованный массив с именами клиента в соответствии с поисковым запросом
      const ordersSrcSearch = Object.values(deleteOrderData)
        .flat()
        .filter((item) => item.client.name.toLowerCase().includes(searchData.request.toLowerCase()));

      // сформировать новый объект заказов после удаления и после повторного поиска
      ordersSrcSearch.forEach((item) => {
        // если массив полный (4 элемента), очистить массив и увеличить ключ на 1
        if (newSearchOrdersObjValue.length === 4) {
          newSearchOrdersObjValue = [];
          newSearchOrdersObjKey++;
        }

        newSearchOrdersObjValue.push(item); // добавить заказ в массив значений объекта
        // добавить значение объекта соответствующему ключу
        newSearchOrdersObj[newSearchOrdersObjKey] = newSearchOrdersObjValue;
      });

      dispatch(setOrdersList(newSearchOrdersObj)); // закинуть в store все заказы в соответствии с поиском
      dispatch(setActiveOrders(newSearchOrdersObj[1])); // закинуть в store активные заказы в соответствии с поиском
      dispatch(selectAll([])); // очистить массив выбранных заказов для удаления

      // Обновить пагинацию
      Object.keys(newSearchOrdersObj).length > 1
        ? dispatch(pagination(Object.keys(newSearchOrdersObj).length))
        : dispatch(pagination(1));

      handleCloseDeleteOrderPopup(); // close popup
    }
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
