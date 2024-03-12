import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

// Files
import { orders } from '../../pages/Orders/data';
import { searchOrder } from './index';

// Store
import { pagination, searchOrderAction, setActiveOrders, setOrdersList } from '../../store/orders/action';
import { searchSelector } from '../../store/orders/selectors';

const SearchOrder = () => {
  const dispatch = useDispatch();
  const searchData = useSelector(searchSelector);
  const { handleSubmit, control, reset } = useForm();

  /*** Handlers ***/
  const handleSearchOrder = (data) => {
    const searchResult = searchOrder(data); // search result

    dispatch(setOrdersList(searchResult)); // закинуть в store все заказы
    dispatch(setActiveOrders(searchResult[1])); // закинуть в store активные заказы

    // Обновить пагинацию
    Object.keys(searchResult).length > 1
      ? dispatch(pagination(Object.keys(searchResult).length))
      : dispatch(pagination(1));

    document.activeElement.blur(); // убрать фокус с input

    dispatch(searchOrderAction(data)); // set search data to the store
  };

  const handleClearSearch = () => {
    let ordersList; // orders list

    reset({ searchOrder: '' }); // очистить поле поиска
    dispatch(searchOrderAction()); // clear search store

    // Set orders
    if (!sessionStorage.getItem('orders')) {
      ordersList = orders; // set default orders from data file

      sessionStorage.setItem('orders', JSON.stringify(orders)); // set to storage
    } else {
      ordersList = JSON.parse(sessionStorage.getItem('orders')); // get from storage
    }

    dispatch(setOrdersList(ordersList)); // закинуть в store все заказы
    dispatch(setActiveOrders(ordersList[1])); // закинуть в store активные заказы

    if (Object.keys(ordersList).length > 1) dispatch(pagination(Object.keys(ordersList).length)); // Set pagination
  };

  return (
    <form className="form orders-search" onSubmit={handleSubmit(handleSearchOrder)}>
      <div className="form__group">
        <Controller
          control={control}
          defaultValue={''}
          name="searchOrder"
          render={({ field }) => (
            <>
              <TextField
                id="outlined-basic"
                {...field}
                className="orders-search__input"
                label="Search by client name"
                variant="outlined"
                placeholder="Search by client name..."
              />
            </>
          )}
        />

        <Button className="btn orders-search-btn" type="submit" variant="text" title="Search order">
          <span className="orders__heading-btn-icon">
            <Search />
          </span>
        </Button>

        {searchData.state && (
          <div className="orders-search__notification">
            <span className="orders-search__notification-title">
              The search result by: <strong>"{searchData.request}"</strong>
            </span>

            <button className="orders-search__notification-btn" type="button" onClick={handleClearSearch}>
              Reset
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchOrder;
