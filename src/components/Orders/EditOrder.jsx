import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

// Files
import './orderAssets.scss';
import { clientEmailOpt, clientNameOpt } from './index';

// Store
import { closeEditOrderPopup, setActiveOrders } from '../../store/orders/action';
import { activePageSelector, editOrderPopupSelector } from '../../store/orders/selectors';

const EditOrder = () => {
  const dispatch = useDispatch();
  const { id, name, email, state } = useSelector(editOrderPopupSelector);
  const activePage = useSelector(activePageSelector);
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setValue('clientName', name); // Set default client name value after app state change
    setValue('clientEmail', email); // Set default client email value after app state change
  }, [name, email]);

  /*** Handlers ***/
  const handleCloseEditOrderPopup = () => {
    clearErrors(); // clear field errors
    dispatch(closeEditOrderPopup()); // close popup
  };
  const handleEditOrder = (data) => {
    const storageOrders = JSON.parse(sessionStorage.getItem('orders')); // get orders from session storage

    // перезаписать активные заказы
    storageOrders[activePage] = storageOrders[activePage].reduce((accum, current) => {
      if (current.id === id) {
        const newClientInfo = {
          ...current,
          client: {
            name: data.clientName,
            email: data.clientEmail,
          },
        };

        return [...accum, newClientInfo];
      }

      return [...accum, current];
    }, []);

    sessionStorage.setItem('orders', JSON.stringify(storageOrders)); // set to the session storage instead backend
    dispatch(setActiveOrders(storageOrders[activePage])); // Set new active orders
    dispatch(closeEditOrderPopup()); // close popup
  };

  return (
    <Dialog
      open={state}
      onClose={handleCloseEditOrderPopup}
      aria-labelledby="alert-dialog-title"
      classes={{ paper: 'edit-popup' }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ px: 0, pt: 0 }}>
        Edit order <strong>#{id}</strong>
      </DialogTitle>

      <DialogContent className="edit-popup__content">
        <form className="form" onSubmit={handleSubmit(handleEditOrder)}>
          {/* New client name */}
          <div className="form__group">
            <label htmlFor="newClientName" className="form__label">
              New client name <span style={{ color: 'red' }}>*</span>
            </label>

            <input
              id="newClientName"
              type="text"
              className="form__input"
              {...register('clientName', clientNameOpt)}
              aria-invalid={!!errors.clientName}
            />
            {errors.clientName && <p className="form__input-error">{errors.clientName.message}</p>}
          </div>

          {/* New client email */}
          <div className="form__group">
            <label htmlFor="newClientEmail" className="form__label">
              New client email <span style={{ color: 'red' }}>*</span>
            </label>

            <input
              id="newClientEmail"
              type="text"
              className="form__input"
              {...register('clientEmail', clientEmailOpt)}
              aria-invalid={!!errors.clientEmail}
            />
            {errors.clientEmail && <p className="form__input-error">{errors.clientEmail.message}</p>}
          </div>

          {/* Edit popup buttons */}
          <div className="form__group form__group--action">
            <button className="btn btn--primary" type="submit" disabled={!isValid}>
              Save
            </button>

            <button className="btn" type="button" onClick={handleCloseEditOrderPopup}>
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrder;
