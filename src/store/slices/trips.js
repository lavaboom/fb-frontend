import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../apiActions';

/* -----------------------------------------------------------------------------
slice definition
----------------------------------------------------------------------------- */ 

const slice = createSlice({
    name: 'trips',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        tripsRequested: (trips, action) => {
            trips.loading = true;
        },
        tripsRequestFailed: (trips, action) => {
            trips.loading = false;
        },
        tripsReceived: (trips, action) => {
            trips.list = action.payload;
            trips.loading = false;
            trips.lastFetch = Date.now();
        }
    }
})

/* -----------------------------------------------------------------------------
action creators
----------------------------------------------------------------------------- */ 
const URL = '/trips/new';

/*
this action creator is able to return a function instead of an object thanks 
to the thunk middleware. the function can optionally receive 2 params: dispatch 
and getState (which redux-thunk passes automatically if a function (instead of 
an obj) is being dispatched)
*/
export const loadtrips = () => (dispatch, getState) => {

    dispatch(
        apiCallBegan({
            URL,
            onStart: slice.actions.tripsRequested.type,
            onSuccess: slice.actions.tripsReceived.type,
            onError: slice.actions.tripsRequestFailed.type
        })
    )
}

/* -----------------------------------------------------------------------------
export reducer and actions
----------------------------------------------------------------------------- */
// export the actions to be called individually. note what are being exported, 
// they are built-in properties of the slice
export const { 
    tripsRequested,
    tripsRequestFailed,
    tripsReceived, 
} = slice.actions;

// export default the reducer
export default slice.reducer;
