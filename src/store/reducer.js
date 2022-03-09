import { combineReducers } from 'redux';
import entitiesReducer from './entities';

// root reducer
export default combineReducers({
    entities: entitiesReducer,
    // auth
})