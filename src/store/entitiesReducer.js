import { combineReducers } from 'redux';
import tripsReducer from './slices/trips';
import candidatesReducer from './slices/candidates';
import reviewsReducer from './slices/reviews';

export default combineReducers({
    trips: tripsReducer,
    candidates: candidatesReducer,
    reviews: reviewsReducer
})
