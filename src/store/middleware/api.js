import axios from 'axios';
import * as actions from '../apiActions';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

/* -----------------------------------------------------------------------------
middleware that will intercept api actions and process accordingly
----------------------------------------------------------------------------- */
const api = ({ dispatch }) => next => async action => {
    // case when action type is not our target api call
    if (action.type !== actions.apiCallBegan.type) return next(action);

    // action type is apiCallBegan
    const { url, data, method, onSuccess, onStart, onError } = action.payload;

    // TODO - loading indicator
    if (onStart) dispatch({ type: onStart });

    // call this function to dispatch the apiCallBegan action itself before 
    // applying logic to dispatch 'additional' actions
    next(action);

    // wrap await in a try-catch block
    try {
        const response = await axios.request({
            baseURL,
            url,
            method,
            data,
        });
        // general
        dispatch(actions.apiCallSuccess(response.data))
        // specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data})
    } catch(error) {
        // general error handling
        dispatch(actions.apiCallFailed(error.message));
        // specific error
        if (onError) dispatch({ type: onError, payload: error.message});
    }
};

export default api;
