import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';
import authReducer from './authReducer';
import apiReducer from './apiActions';

// root reducer
export default combineReducers({
    entities: entitiesReducer,
    auth: authReducer,
    api: apiReducer
})
