import { combineReducers } from 'redux'
import { regReducer } from './regreducer'
import { authReducer } from './authreducer'




export const rootReducer = combineReducers({
    reg: regReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>
