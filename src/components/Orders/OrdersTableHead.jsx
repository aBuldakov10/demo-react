import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Divider } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

// Files
import { sortOrdersFn } from './index';

// Store
import { setActiveOrders, sortOrders, selectAll } from '../../store/orders/action';
import { activeOrdersSelector, sortedSelector, deleteOrderSelectedAll } from '../../store/orders/selectors';

const OrdersTableHead = () => {
  const dispatch = useDispatch();
  const activeOrders = useSelector(activeOrdersSelector); // active orders
  const sortedDirection = useSelector(sortedSelector); // направление сортировки
  const selectedOrders = useSelector(deleteOrderSelectedAll); // selected orders for delete

  const handleSelectAllOrders = (event) => {
    // пустой массив или массив с id активных заказов
    const selectedId = event.target.checked ? activeOrders.reduce((accum, current) => [...accum, current.id], []) : [];

    dispatch(selectAll(selectedId));
  };

  /*** Handlers ***/
  const handleSortOrders = (orderField, direction) => {
    // функция сортировки возвращает отсортированный массив
    const res = sortOrdersFn(activeOrders, orderField, direction);

    dispatch(setActiveOrders(res)); // обновить состояние отсортированных заказов
    dispatch(sortOrders(orderField, direction)); // обновить маркер отсортированности заказов
  };

  return (
    <div className="orders-table__heading">
      {/* Check */}
      <div className="orders-table__col orders-check">
        <Checkbox
          onChange={handleSelectAllOrders}
          checked={selectedOrders.length === activeOrders.length} // выделены все
          indeterminate={selectedOrders.length > 0 && selectedOrders.length < activeOrders.length} // выделены не все
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>

      <Divider orientation="vertical" flexItem />

      {/* ID */}
      <div className="orders-table__col orders-id">
        <span>ID</span>

        <div className="orders-table__sort">
          <div
            className={`orders-table__sort-elem orders-table__sort-elem--asc ${
              sortedDirection.id === 'id-asc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('id', 'asc')}
          >
            <ArrowDropUp />
          </div>

          <div
            className={`orders-table__sort-elem orders-table__sort-elem--desc ${
              sortedDirection.id === 'id-desc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('id', 'desc')}
          >
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Order title */}
      <div className="orders-table__col orders-name">
        <span>Order name</span>

        <div className="orders-table__sort">
          <div
            className={`orders-table__sort-elem orders-table__sort-elem--asc ${
              sortedDirection.title === 'title-asc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('title', 'asc')}
          >
            <ArrowDropUp />
          </div>

          <div
            className={`orders-table__sort-elem orders-table__sort-elem--desc ${
              sortedDirection.title === 'title-desc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('title', 'desc')}
          >
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Client name */}
      <div className="orders-table__col orders-client-name">
        <span>Client name</span>

        <div className="orders-table__sort">
          <div
            className={`orders-table__sort-elem orders-table__sort-elem--asc ${
              sortedDirection.client === 'client-asc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('client', 'asc')}
          >
            <ArrowDropUp />
          </div>

          <div
            className={`orders-table__sort-elem orders-table__sort-elem--desc ${
              sortedDirection.client === 'client-desc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('client', 'desc')}
          >
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Email */}
      <div className="orders-table__col orders-email">Email</div>

      <Divider orientation="vertical" flexItem />

      {/* Date */}
      <div className="orders-table__col orders-date">
        <span>Date</span>

        <div className="orders-table__sort">
          <div
            className={`orders-table__sort-elem orders-table__sort-elem--asc ${
              sortedDirection.date === 'date-asc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('date', 'asc')}
          >
            <ArrowDropUp />
          </div>

          <div
            className={`orders-table__sort-elem orders-table__sort-elem--desc ${
              sortedDirection.date === 'date-desc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('date', 'desc')}
          >
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Sum */}
      <div className="orders-table__col orders-sum">
        <span>Order sum</span>

        <div className="orders-table__sort">
          <div
            className={`orders-table__sort-elem orders-table__sort-elem--asc ${
              sortedDirection.sum === 'sum-asc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('sum', 'asc')}
          >
            <ArrowDropUp />
          </div>

          <div
            className={`orders-table__sort-elem orders-table__sort-elem--desc ${
              sortedDirection.sum === 'sum-desc' ? 'disabled' : ''
            }`}
            onClick={() => handleSortOrders('sum', 'desc')}
          >
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Action */}
      <div className="orders-table__col orders-action">Action</div>
    </div>
  );
};

export default OrdersTableHead;
