import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from './auth/reducers';
import { weatherReducer } from './weather/reducers';
import { taskReducer } from './tasks/reducers';
import { ordersReducer } from './orders/reducers';

/*** Redux devtools ***/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/*** Reducers list ***/
const reducers = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  tasks: taskReducer,
  orders: ordersReducer,
});

/*** Global store ***/
const store = createStore(reducers, compose(applyMiddleware(thunk), composeEnhancers));

export default store;
