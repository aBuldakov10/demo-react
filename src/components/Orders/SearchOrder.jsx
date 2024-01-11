import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

// Files
import { searchOrder } from './index';

// Store
import { pagination, searchOrderAction, setActiveOrders, setOrdersList } from '../../store/orders/action';
import { ordersSelector, searchSelector } from '../../store/orders/selectors';

const SearchOrder = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(ordersSelector);
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

    reset({ searchOrder: '' }); // очистить поле поиска

    document.activeElement.blur(); // убрать фокус с input

    dispatch(searchOrderAction(data)); // set search data to the store
    // dispatch(searchOrderAction()); // clear search store
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

            <button className="orders-search__notification-btn" type="submit">
              Reset
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchOrder;
