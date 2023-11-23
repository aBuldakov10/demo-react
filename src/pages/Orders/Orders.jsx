import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, TextField, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import './Orders.scss';
import { orders } from './data';

// Store
import { addPagination, changePaginationPage, setActiveOrders, setOrdersList } from '../../store/orders/action';
import { activePageSelector, paginationPagesSelector, paginationStateSelector } from '../../store/orders/selectors';

// Components
import HeadPage from '../../components/HeadPage';
import OrdersTableHead from '../../components/Orders/OrdersTableHead';
import OrdersTableBody from '../../components/Orders/OrdersTableBody';

const Orders = () => {
  const dispatch = useDispatch();
  const isOrderPagination = useSelector(paginationStateSelector); // pagination state
  const activePage = useSelector(activePageSelector); // active pagination page
  const countPages = useSelector(paginationPagesSelector); // count pagination page
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

    dispatch(setOrdersList(ordersList));
    dispatch(setActiveOrders(ordersList[1]));

    if (Object.keys(orders).length > 1) dispatch(addPagination(Object.keys(orders).length)); // Set pagination
  }, []);

  /*** Handlers ***/
  const handleChangePage = (event, value) => dispatch(changePaginationPage(value)); // Change page

  return (
    <Box className="orders">
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      {/*** Orders page heading ***/}
      <Box className="orders__heading">
        <Typography className="orders__heading-title" variant="h4" component="h1" gutterBottom>
          Total orders
        </Typography>

        <TextField
          id="outlined-basic"
          className="orders__heading-search"
          label="Search by name"
          variant="outlined"
          placeholder="Search by name..."
        />

        <Button className="btn orders__heading-add" variant="contained" color="custom" title="Add">
          Add
        </Button>
      </Box>

      {/*** Orders page body ***/}
      <div className="table-wrapper">
        <Box className="orders__body orders-table">
          {/* Table heading */}
          <OrdersTableHead />

          {/* Table body */}
          <OrdersTableBody />
        </Box>
      </div>

      {/*** Orders pagination ***/}
      {isOrderPagination && (
        <Box className="orders__pagination">
          <Pagination count={countPages} page={activePage} onChange={handleChangePage} />
        </Box>
      )}
    </Box>
  );
};

export default Orders;
