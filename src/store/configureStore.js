import reducer from './reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/api';

export default function() {
    return configureStore({
        reducer: reducer,
        // middlewares will be called in order
        middleware: [
            // bundled in this default middleware is thunk which allows 
            // us to dispatch functions (rather than objects) 
            ...getDefaultMiddleware(),
            api,
        ]
    })
}
