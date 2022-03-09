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
        apiCallSent: (trips) => {
            trips.loading = true;
        },
        apiCallFailed: (trips) => {
            trips.loading = false;
        },
        tripsFetched: (trips, action) => {
            trips.list = action.payload;
            trips.loading = false;
            trips.lastFetch = Date.now();
        },
        tripDeleted: (trips, actions) => {
            // upon successful delete on server, delete locally
            if (actions.payload.tripID) {
                trips.list = trips.list.filter(
                    trip => trip.id !== actions.payload.tripID
                )
            };
        }
    }
})

/* -----------------------------------------------------------------------------
action creators
----------------------------------------------------------------------------- */ 

/*
this action creator is able to return a function instead of an object thanks 
to the thunk middleware. the function can optionally receive 2 params: dispatch 
and getState (which redux-thunk passes automatically if a function (instead of 
an obj) is being dispatched)
*/
export const loadTripsByUser = (userID) => (dispatch, getState) => {

    dispatch(
        apiCallBegan({
            url: `users/${userID}/trips`,
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.tripsFetched.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

export const deleteTrip = tripID => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: `/trips/${tripID}`,
            method: 'delete',
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.tripDeleted.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

/* -----------------------------------------------------------------------------
export reducer and actions
----------------------------------------------------------------------------- */
// export the actions to be called individually. note what are being exported, 
// they are built-in properties of the slice
export const { 
    apiCallSent,
    apiCallFailed,
    tripsFetched, 
} = slice.actions;

// export default the reducer
export default slice.reducer;
