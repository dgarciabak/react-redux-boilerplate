import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import mainReducer from './main-reducer';

// Combine Reducers
const reducers = combineReducers({
  mainState: mainReducer,
  router: routerReducer,
});

export default reducers;
