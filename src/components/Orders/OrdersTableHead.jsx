import React, { useState } from 'react';
import { Checkbox, Divider } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const OrdersTableHead = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="orders-table__heading">
      {/* Check */}
      <div className="orders-table__col orders-check">
        <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      </div>

      <Divider orientation="vertical" flexItem />

      {/* ID */}
      <div className="orders-table__col orders-id">
        <span>ID</span>

        <div className="orders-table__sort">
          <div className="orders-table__sort-elem orders-table__sort-elem--asc">
            <ArrowDropUp />
          </div>

          <div className="orders-table__sort-elem orders-table__sort-elem--desc">
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Order name */}
      <div className="orders-table__col orders-name">
        <span>Order name</span>

        <div className="orders-table__sort">
          <div className="orders-table__sort-elem orders-table__sort-elem--asc">
            <ArrowDropUp />
          </div>

          <div className="orders-table__sort-elem orders-table__sort-elem--desc">
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Client name */}
      <div className="orders-table__col orders-client-name">
        <span>Client name</span>

        <div className="orders-table__sort">
          <div className="orders-table__sort-elem orders-table__sort-elem--asc">
            <ArrowDropUp />
          </div>

          <div className="orders-table__sort-elem orders-table__sort-elem--desc">
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
          <div className="orders-table__sort-elem orders-table__sort-elem--asc">
            <ArrowDropUp />
          </div>

          <div className="orders-table__sort-elem orders-table__sort-elem--desc">
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Sum */}
      <div className="orders-table__col orders-sum">
        <span>Order sum</span>

        <div className="orders-table__sort">
          <div className="orders-table__sort-elem orders-table__sort-elem--asc">
            <ArrowDropUp />
          </div>

          <div className="orders-table__sort-elem orders-table__sort-elem--desc">
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
