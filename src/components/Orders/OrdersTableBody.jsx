import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Divider } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

// Files
import { formatDate } from '../../constants/constants';

// Store
import { activeOrdersSelector } from '../../store/orders/selectors';
import { openEditOrderPopup } from '../../store/orders/action';

const OrdersTableBody = () => {
  const dispatch = useDispatch();
  const activeOrders = useSelector(activeOrdersSelector); // active orders

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="orders-table__body">
      {activeOrders.map(({ id, title, date, sum, client }) => {
        return (
          <div className="orders-table__body-item" key={id}>
            {/* Check */}
            <div className="orders-table__col orders-check">
              <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
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
