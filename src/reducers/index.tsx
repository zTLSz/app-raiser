import { combineReducers } from 'redux'
import { regReducer } from './regreducer'
import { authReducer } from './authreducer'
import { editProfileReducer } from './editprofilereducer'




export const rootReducer = combineReducers({
    reg: regReducer,
    auth: authReducer,
    editprofile: editProfileReducer
});

export type RootState = ReturnType<typeof rootReducer>
