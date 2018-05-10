import { createStore, combineReducers } from 'redux';

import userReducer from './user';

const reducer = combineReducers({
  userReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;