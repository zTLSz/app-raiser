import { combineReducers } from 'redux'
import { regReducer } from './regreducer'
import { authReducer } from './authreducer'
import { editProfileReducer } from './editprofilereducer'
import { getProfileReducer } from './getprofilereducer'




export const rootReducer = combineReducers({
    reg: regReducer,
    auth: authReducer,
    editprofile: editProfileReducer,
    currprofile: getProfileReducer
});

export type RootState = ReturnType<typeof rootReducer>
