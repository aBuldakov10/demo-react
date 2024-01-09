import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Divider } from '@mui/material';
import { Edit } from '@mui/icons-material';

// Files
import { formatDate } from '../../constants/constants';

// Store
import { openEditOrderPopup, selectAll } from '../../store/orders/action';
import { activeOrdersSelector, deleteOrderSelectedAll } from '../../store/orders/selectors';

const OrdersTableBody = () => {
  const dispatch = useDispatch();
  const activeOrders = useSelector(activeOrdersSelector); // active orders
  const selectedOrders = useSelector(deleteOrderSelectedAll); // selected orders for delete

  const handleSelectOrder = (event, id) => {
    // отметить чекбокс заказа и его нет в массиве выбранных
    const addOrderForDelete = event.target.checked && !selectedOrders.includes(id);
    // отметить чекбокс заказа и он есть в массиве выбранных или снять чекбокс заказа
    const removeOrderForDelete = (event.target.checked && selectedOrders.includes(id)) || !event.target.checked;

    // отменить выбор заказа для удаления
    if (removeOrderForDelete) {
      const filteredSelectedOrders = selectedOrders.filter((item) => item !== id);

      dispatch(selectAll(filteredSelectedOrders));
    }

    // выбрать заказ для удаления
    if (addOrderForDelete) dispatch(selectAll([...selectedOrders, id]));
  };

  return (
    <div className="orders-table__body">
      {activeOrders.map(({ id, title, date, sum, client }) => {
        return (
          <div className="orders-table__body-item" key={id}>
            {/* Check */}
            <div className="orders-table__col orders-check">
              <Checkbox
                checked={selectedOrders.includes(id)} // состояние в соответствии с selectedOrders для удаления
                onChange={(e) => handleSelectOrder(e, id)} // добавление/удаление в selectedOrders
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>

            <Divider orientation="vertical" flexItem />

            {/* ID */}
            <div className="orders-table__col orders-id">{id}</div>

            <Divider orientation="vertical" flexItem />

            {/* Order name */}
            <div className="orders-table__col orders-name">{title}</div>

            <Divider orientation="vertical" flexItem />

            {/* Client name */}
            <div className="orders-table__col orders-client-name">{client.name}</div>

            <Divider orientation="vertical" flexItem />

            {/* Email */}
            <div className="orders-table__col orders-email" title={client.email}>
              {client.email}
            </div>

            <Divider orientation="vertical" flexItem />

            {/* Date */}
            <div className="orders-table__col orders-date">{formatDate(date)}</div>

            <Divider orientation="vertical" flexItem />

            {/* Sum */}
            <div className="orders-table__col orders-sum">{sum}</div>

            <Divider orientation="vertical" flexItem />

            {/* Action */}
            <div className="orders-table__col orders-action">
              <Button
                variant="contained"
                color="primary"
                title="Edit order"
                onClick={() => dispatch(openEditOrderPopup(id, client.name, client.email))}
              >
                <Edit style={{ fontSize: 'inherit' }} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersTableBody;
