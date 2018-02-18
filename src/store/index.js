import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {navigation} from './reducers';


const reducers = combineReducers({
    navigation,
});


const middlewares = [thunk];
export const store = compose(
    applyMiddleware(...middlewares)
)(createStore)(reducers);