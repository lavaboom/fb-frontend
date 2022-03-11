import axios from 'axios';
import * as actions from '../apiActions';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

/* -----------------------------------------------------------------------------
middleware that will intercept api actions and process accordingly
----------------------------------------------------------------------------- */
const api = ({ dispatch }) => next => action => {
    // case when action type is not our target api call
    if (action.type !== actions.apiCallBegan.type) return next(action);

    // action type is apiCallBegan
    const { url, data, method, onSuccess, onStart, onError } = action.payload;

    // TODO - loading indicator
    if (onStart) dispatch({ type: onStart });

    // dispatch apiCallBegan itself before dispatching additional actions
    next(action);

    // retrieve token if available
    const token = sessionStorage.getItem('token');

    // make the request - baseURL will be prepended to url automatically
    axios({
        method,
        baseURL,
        url,
        data,
        headers: {
            Authorization: 'Bearer ' + token
        },
    }).then(response => {
        dispatch(actions.apiCallSuccess(response.data));
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data});
    }).catch(error => {
        dispatch(actions.apiCallFailed(error.message));
        if (onError) dispatch({ type: onError, payload: error.message});
    });
};

export default api;
