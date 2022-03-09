import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './apiActions';

/* -----------------------------------------------------------------------------
slice definition
----------------------------------------------------------------------------- */ 

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        loading: false
    },
    reducers: {
        authRequested: (auth) => {
            auth.loading = true;
        },
        authRequestFailed: (auth) => {
            auth.loading = false;
        },
        authReceived: (auth, action) => {
            sessionStorage.setItem('token', action.payload.token);
            auth.loading = false;
            auth.isLoggedIn = true;
        },
        authRemoved: (auth) => {
            sessionStorage.removeItem('token');
            auth.isLoggedIn = false;
        }
    }
})

/* -----------------------------------------------------------------------------
action creators
----------------------------------------------------------------------------- */ 
const url = '/users/login';

/*
this action creator is able to return a function instead of an object thanks 
to the thunk middleware. the function can optionally receive 2 params: dispatch 
and getState (which redux-thunk passes automatically if a function (instead of 
an obj) is being dispatched)
*/
export const login = data => (dispatch) => {

    dispatch(
        apiCallBegan({
            url,
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
// export the actions to be called individually. note what are being exported, 
// they are built-in properties of the slice
export const { 
    authRequested,
    authRequestFailed,
    authReceived, 
} = slice.actions;

// export default the reducer
export default slice.reducer;
