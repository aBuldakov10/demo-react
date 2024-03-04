import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Pagination } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Files
import './Orders.scss';
import { orders } from './data';

// Store
import {
  setOrdersList,
  setActiveOrders,
  sortOrders,
  pagination,
  changePaginationPage,
  openAddOrderPopup,
  openDeleteOrderPopup,
  selectAll,
} from '../../store/orders/action';
import {
  paginationStateSelector,
  paginationPagesSelector,
  activePageSelector,
  deleteOrderSelectedAll,
  ordersSelector,
  activeOrdersSelector,
  searchSelector,
} from '../../store/orders/selectors';

// Components
import HeadPage from '../../components/HeadPage';
import OrdersTableHead from '../../components/Orders/OrdersTableHead';
import OrdersTableBody from '../../components/Orders/OrdersTableBody';
import SearchOrder from '../../components/Orders/SearchOrder';
import AddOrder from '../../components/Orders/AddOrder';
import EditOrder from '../../components/Orders/EditOrder';
import DeleteOrder from '../../components/Orders/DeleteOrder';

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(ordersSelector); // all orders
  const activeOrders = useSelector(activeOrdersSelector); // active orders
  const isOrderPagination = useSelector(paginationStateSelector); // pagination state
  const countPages = useSelector(paginationPagesSelector); // count pagination page
  const activePage = useSelector(activePageSelector); // active pagination page
  const isDeleteOrderButton = useSelector(deleteOrderSelectedAll); // selected orders for delete
  const searchData = useSelector(searchSelector);
  const { t } = useTranslation();

  // Page head meta data
  const pageHeadData = {
    title: t('orders.page.title'),
    description: t('orders.page.description'),
    keywords: t('orders.page.keywords'),
    bodyAttributes: { class: 'orders-page' },
  };

  useEffect(() => {
    let ordersList; // orders list

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
  }, []);

  /*** Handlers ***/
  const handleOpenAddOrderPopup = () => dispatch(openAddOrderPopup()); // Open add popup
  const handleOpenDeleteOrderPopup = () => dispatch(openDeleteOrderPopup()); // Open delete popup
  const handleChangePage = (event, value) => {
    if (activePage === value) return;

    let ordersList;

    // список заказов взять из результатов поиска или из sessionStorage
    searchData.state ? (ordersList = allOrders) : (ordersList = JSON.parse(sessionStorage.getItem('orders')));

    dispatch(changePaginationPage(value)); // смена страницы пагинации
    dispatch(setActiveOrders(ordersList[value])); // смена активной страницы пагинации
    dispatch(sortOrders()); // set default sort buttons
    dispatch(selectAll([])); // очистить массив заказов для удаления
  };

  return (
    <Box className="orders">
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      {/*** Orders page heading ***/}
      <Box className="orders__heading">
        <Typography className="orders__heading-title" variant="h4" component="h1" gutterBottom>
          Orders
        </Typography>

        {/*** Search order ***/}
        <SearchOrder />

        <Button
          className="btn orders__heading-btn orders__heading-btn--add"
          variant="contained"
          color="success"
          title="New order"
          onClick={handleOpenAddOrderPopup}
        >
          <span className="orders__heading-btn-icon">
            <Add />
          </span>

          <span className="orders__heading-btn-name">New order</span>
        </Button>

        {/* Show delete button after select order */}
        {isDeleteOrderButton.length > 0 && (
          <Button
            className="btn orders__heading-btn orders__heading-btn--delete"
            variant="contained"
            color="error"
            title="Delete order"
            onClick={handleOpenDeleteOrderPopup}
          >
            <span className="orders__heading-btn-icon">
              <Delete />
            </span>

            <span className="orders__heading-btn-name">delete</span>
          </Button>
        )}
      </Box>

      {/*** Orders page body ***/}
      <div className="table-wrapper">
        <Box className="orders__body orders-table">
          {activeOrders ? (
            <>
              {/* Table heading */}
              <OrdersTableHead />

              {/* Table body */}
              <OrdersTableBody />
            </>
          ) : (
            <Typography variant="body" component="h2" align="center">
              Заказов нет
            </Typography>
          )}
        </Box>
      </div>

      {/*** Orders pagination ***/}
      {isOrderPagination && (
        <Box className="orders__pagination">
          <Pagination count={countPages} page={activePage} onChange={handleChangePage} />
        </Box>
      )}

      {/*** Add order ***/}
      <AddOrder />

      {/*** Edit order ***/}
      <EditOrder />

      {/*** Delete order ***/}
      <DeleteOrder />
    </Box>
  );
};

export default Orders;
