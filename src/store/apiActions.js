// api related actions
import { createAction, createReducer } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');

// we do not have an initialState so just pass {} as first arg
const apiReducer = createReducer({}, (builder) => {
    builder
        .addCase(apiCallSuccess, (_state, action) => {
            // console.log(`Sucess call: ${action.payload}`)
        })
        .addCase(apiCallFailed, (_state, action) => {
            console.log(`Failed call: ${action.payload}`)
        })
})

export default apiReducer;
