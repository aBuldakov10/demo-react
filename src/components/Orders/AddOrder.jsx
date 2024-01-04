import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';

// Files
import { clientEmailOpt, clientNameOpt, createOrder, orderNameOpt, orderSumOpt } from './index';

// Store
import { closeAddOrderPopup, pagination, setActiveOrders, setOrdersList } from '../../store/orders/action';
import { addOrderPopupSelector } from '../../store/orders/selectors';

const AddOrder = () => {
  const dispatch = useDispatch();
  const popupState = useSelector(addOrderPopupSelector);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  /*** Handlers ***/
  const handleCloseAddOrderPopup = () => dispatch(closeAddOrderPopup());
  const handleAddOrder = (data) => {
    const createOrderData = createOrder(data); // объект всех заказов с новым созданным заказом

    dispatch(setOrdersList(createOrderData)); // закинуть в store все заказы
    dispatch(setActiveOrders(createOrderData[1])); // закинуть в store активные заказы

    // Обновить пагинацию
    if (Object.keys(createOrderData).length > 1) dispatch(pagination(Object.keys(createOrderData).length));

    reset({ orderName: '', clientName: '', clientEmail: '', orderSum: '' }); // очистить поля

    handleCloseAddOrderPopup(); // close popup
  };

  return (
    <Dialog
      open={popupState}
      onClose={handleCloseAddOrderPopup}
      aria-labelledby="alert-dialog-title"
      classes={{ paper: 'add-popup' }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ px: 0, pt: 0 }}>
        Add new order
      </DialogTitle>

      <DialogContent className="add-popup__content">
        <form className="form" onSubmit={handleSubmit(handleAddOrder)}>
          {/* Order name */}
          <div className="form__group">
            <Controller
              control={control}
              name="orderName"
              rules={orderNameOpt}
              defaultValue={''}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField label="Order name *" {...field} placeholder="Order name" variant="outlined" fullWidth />
                  {error && <p className="form__input-error">{error.message}</p>}
                </>
              )}
            />
          </div>

          {/* Client name */}
          <div className="form__group">
            <Controller
              control={control}
              name="clientName"
              rules={clientNameOpt}
              defaultValue={''}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField label="Client name *" {...field} placeholder="Client name" variant="outlined" fullWidth />
                  {error && <p className="form__input-error">{error.message}</p>}
                </>
              )}
            />
          </div>

          {/* Client email */}
          <div className="form__group">
            <Controller
              control={control}
              name="clientEmail"
              rules={clientEmailOpt}
              defaultValue={''}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    label="Client email *"
                    {...field}
                    placeholder="Client email"
                    variant="outlined"
                    fullWidth
                  />
                  {error && <p className="form__input-error">{error.message}</p>}
                </>
              )}
            />
          </div>

          {/* Order sum */}
          <div className="form__group">
            <Controller
              control={control}
              name="orderSum"
              rules={orderSumOpt}
              defaultValue={''}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField label="Order sum *" {...field} placeholder="Order sum" variant="outlined" fullWidth />
                  {error && <p className="form__input-error">{error.message}</p>}
                </>
              )}
            />
          </div>

          {/* Add order popup buttons */}
          <div className="form__group form__group--action">
            <button className="btn btn--primary" type="submit" disabled={!isValid}>
              Save
            </button>

            <button className="btn" type="button" onClick={handleCloseAddOrderPopup}>
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrder;
