import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import spaceShipReducer from './reducers';

const rootReducer = combineReducers({spaceShipReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
