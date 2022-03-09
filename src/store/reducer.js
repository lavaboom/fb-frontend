import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';
import authReducer from './authReducer';

// root reducer
export default combineReducers({
    entities: entitiesReducer,
    auth: authReducer
})
