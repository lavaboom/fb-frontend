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
        listWithCandidates: [],
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
            // add formatted date to each trip
            trips.list.forEach(item => {
                let tempDate = new Date(item['job_date']);
                item['formatted_date'] = tempDate.toString();
            })
            trips.loading = false;
            trips.lastFetch = Date.now();
        },
        tripsWithCandidatesFetched: (trips, action) => {
            trips.listWithCandidates = action.payload;
        },
        tripDeleted: (trips, actions) => {
            // id of the deleted trip will be return. use it to delete locally
            trips.list = trips.list.filter(
                trip => trip.id.toString() !== actions.payload.toString()
            )
        },
        tripEditted: (trips, actions) => {
            // number of rows affected is returned from server
            console.log(`Editted ${actions.payload} trips`)
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

export const loadTripsWithCandidates = (userID) => (dispatch, getState) => {

    dispatch(
        apiCallBegan({
            url: `users/${userID}/trips-with-candidates`,
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.tripsWithCandidatesFetched.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

export const editTrip = (tripID, data) => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: `/trips/${tripID}`,
            method: 'PUT',
            data,
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.tripEditted.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

export const deleteTrip = tripID => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: `/trips/${tripID}`,
            method: 'DELETE',
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
    tripDeleted,
    tripEditted 
} = slice.actions;

// export default the reducer
export default slice.reducer;
