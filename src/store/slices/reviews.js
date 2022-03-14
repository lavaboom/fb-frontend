import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../apiActions';

/* -----------------------------------------------------------------------------
slice definition
----------------------------------------------------------------------------- */ 

const slice = createSlice({
    name: 'reviews',
    initialState: {
        reviewer: null,
        recipient: null,
        loading: false,
        lastFetch: null,
        lastEdit: null
    },
    reducers: {
        apiCallSent: (reviews) => {
            reviews.loading = true;
        },
        apiCallFailed: (reviews) => {
            reviews.loading = false;
        },
        reviewerFetched: (reviews, action) => {
            reviews.reviewer = action.payload;
        },
        recipientFetched: (reviews, action) => {
            reviews.recipient = action.payload;
        },
    }
})

/* -----------------------------------------------------------------------------
action creators
----------------------------------------------------------------------------- */ 

// fetch all ratings for a certain candidate given his candidateID
export const fetchUserData = (driverID) => (dispatch) => {
    
    // fetch driver data
    dispatch(
        apiCallBegan({
            url: `/users/${driverID}/details`,
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.recipientFetched.type,
            onError: slice.actions.apiCallFailed.type
        })
    );
    
    // fetch reviewer data
    dispatch(
        apiCallBegan({
            url: `users/current`,
            onStart: slice.actions.apiCallSent.type,
            onSuccess: slice.actions.reviewerFetched.type,
            onError: slice.actions.apiCallFailed.type
        })
    )
}

export const postReview = (driverID, tripID, data) => dispatch => {

    dispatch(
        apiCallBegan({
            url: `/reviews/${tripID}/${driverID}`,
            method: 'POST',
            data,
            onStart: slice.actions.apiCallSent.type,
            onError: slice.actions.apiCallFailed.type
        }),
    );
}

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
