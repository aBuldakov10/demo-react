import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { taskReducer } from './tasks/reducers';
import { weatherReducer } from './weather/reducers';

/*** Redux devtools ***/
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/*** Reducers list ***/
const reducers = combineReducers({
  weather: weatherReducer,
  tasks: taskReducer,
});

/*** Global store ***/
const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), composeEnhancers)
);

export default store;
