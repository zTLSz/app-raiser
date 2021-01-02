import { combineReducers } from 'redux'
import { regReducer } from './regreducer'
import { authReducer } from './authreducer'
import { editProfileReducer } from './editprofilereducer'
import { getProfileReducer } from './getprofilereducer'
import { editProfilePicReducer } from './editprofilepicreducer'
import { addWallPostReducer } from './addwallpost'
import { getWallPostsReducer } from './getwallposts'
import { setPostLikeReducer } from './setpostlikereducer'




export const rootReducer = combineReducers({
    reg: regReducer,
    auth: authReducer,
    editprofile: editProfileReducer,
    editprofilepic: editProfilePicReducer,
    currprofile: getProfileReducer,
    addwallpost: addWallPostReducer,
    wallposts: getWallPostsReducer,
    postrate: setPostLikeReducer,
});

export type RootState = ReturnType<typeof rootReducer>
