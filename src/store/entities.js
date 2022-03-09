import { combineReducers } from 'redux';
import tripsReducer from './slices/trips';

export default combineReducers({
    trips: tripsReducer
})
