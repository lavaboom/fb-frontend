import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './apiActions';

/* -----------------------------------------------------------------------------
slice definition
----------------------------------------------------------------------------- */ 

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        loading: false,
        error: '',
        user: null,
    },
    reducers: {
        authRequested: (auth) => {
            auth.loading = true;
        },
        authRequestFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload;
        },
        authReceived: (auth, action) => {
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            auth.loading = false;
            auth.isLoggedIn = true;
            auth.user = action.payload.user;
        },
        authRemoved: (auth) => {
            sessionStorage.removeItem('token');
            auth.isLoggedIn = false;
            auth.user = null;
        }
    }
})

/* -----------------------------------------------------------------------------
action creators
----------------------------------------------------------------------------- */ 
export const login = data => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: '/users/login',
            data,
            method: 'post',
            onStart: slice.actions.authRequested.type,
            onSuccess: slice.actions.authReceived.type,
            onError: slice.actions.authRequestFailed.type
        })
    )
}

export const signup = data => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: '/users/register',
            data,
            method: 'post',
            onStart: slice.actions.authRequested.type,
            onSuccess: slice.actions.authReceived.type,
            onError: slice.actions.authRequestFailed.type
        })
    )
}

/* -----------------------------------------------------------------------------
export reducer and actions
----------------------------------------------------------------------------- */
// export the actions to be called individually
export const { 
    authRequested,
    authRequestFailed,
    authReceived, 
} = slice.actions;

// export default the reducer
export default slice.reducer;
