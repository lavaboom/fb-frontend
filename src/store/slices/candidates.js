import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../apiActions';

/* -----------------------------------------------------------------------------
slice definition
----------------------------------------------------------------------------- */ 

const slice = createSlice({
    name: 'candidates',
    initialState: {
        candidatesRatings: [],
        modalCandidates: [],
        loading: false,
        lastFetch: null,
        lastEdit: null
    },
    reducers: {
        apiCallSent: (candidates) => {
            candidates.loading = true;
        },
        apiCallFailed: (candidates) => {
            candidates.loading = false;
        },
        ratingsFetched: (candidates, action) => {
            let sumScore = 0;
            let totalNumbers = 0;
            let records = action.payload;
            let driverID = action.urlParams.candidateID;
            let avgScore = 'No ratings';

            if (records.length > 0) {
                records.forEach(obj => {
                    sumScore += obj.score;
                    totalNumbers += 1;
                })
                avgScore = Math.round((sumScore / totalNumbers) * 10) / 10;
            }

            candidates.candidatesRatings[driverID] = avgScore;
            candidates.loading = false;
            candidates.lastFetch = Date.now();

        },
        candidatesFetched: (candidates, action) => {
            candidates.modalCandidates = action.payload;
        },
        driverAccepted: (candidates, action) => {
            candidates.lastEdit = Date.now();
        }
    }
})

/* -----------------------------------------------------------------------------
action creators
----------------------------------------------------------------------------- */ 

// fetch all ratings for a certain candidate given his candidateID
export const fetchRatings = (candidateID) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: `/reviews/${candidateID}/all-reviews`,
            urlParams: { candidateID },
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.ratingsFetched.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

// fetch all candidates for a trip
export const fetchCandidatesForTrip = (tripID) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: `/trips/${tripID}/candidates`,
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.candidatesFetched.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

export const acceptDriver = (driverID, tripID) => dispatch => {

    // first, update the trip to record accepted driver
    dispatch(
        apiCallBegan({
            url: `/trips/${tripID}`,
            method: 'PUT',
            data: {
                driver_id: driverID,
                status: 'IN PROGRESS'
            },
        })
    );
    
    // update the candidates table too
    dispatch(
        apiCallBegan({
            url: `/trips/${tripID}/candidates`,
            method: 'PUT',
            data: {
                candidate_id: driverID,
            },
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.driverAccepted.type,
            onError: slice.actions.apiCallFailed.type
        })
    );
}

/* -----------------------------------------------------------------------------
memoization selectors
----------------------------------------------------------------------------- */ 
export const getCandidatesRatings = createSelector(
    // slices selector
    state => state.entities.candidates,
    // resolve functions - output will be cached
    (candidates) => candidates.candidatesRatings
)

/* -----------------------------------------------------------------------------
export reducer and actions
----------------------------------------------------------------------------- */
// export actions
export const { 
    apiCallSent,
    apiCallFailed,
    ratingsFetched
} = slice.actions;

// export default the reducer
export default slice.reducer;
