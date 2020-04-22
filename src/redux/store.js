import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rooteReducer from './root. reducer';

const middlewares  = [logger];

const store = createStore(rooteReducer,applyMiddleware(...middlewares))

export default store;