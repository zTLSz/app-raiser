import { takeEvery } from 'redux-saga/effects'
import { sagaRegWorker, REG_REQUEST } from '../reg'
import { sagaLoginWorker, LOGIN_REQUEST, sagaVerifyWorker, VERIFY_REQUEST, sagaLogoutWorker, LOGOUT_REQUEST } from '../auth'
import { sagaEditProfileWorker, USER_EDIT_REQUEST } from '../editProfile'
import { sagaEditProfilePicWorker, USER_PIC_EDIT_REQUEST } from '../editUserPic'
import { sagaGetProfileWorker, GET_PROFILE_REQUEST } from '../getProfile'
import { sagaAddWallPostWorker, ADD_WALL_POST_REQUEST } from '../addwallpost'
import { sagaGetWallPostsWorker, GET_WALL_POSTS_REQUEST } from '../getWallPosts'
import { sagaSetPostLike,  SET_POST_LIKE_REQUEST} from '../postlikes/setPostLike'


export function* rootSaga() {
    yield takeEvery(REG_REQUEST, sagaRegWorker)
    yield takeEvery(LOGIN_REQUEST, sagaLoginWorker)
    yield takeEvery(VERIFY_REQUEST, sagaVerifyWorker)
    yield takeEvery(LOGOUT_REQUEST, sagaLogoutWorker)
    yield takeEvery(USER_EDIT_REQUEST, sagaEditProfileWorker)
    yield takeEvery(USER_PIC_EDIT_REQUEST, sagaEditProfilePicWorker)
    yield takeEvery(GET_PROFILE_REQUEST, sagaGetProfileWorker)
    yield takeEvery(ADD_WALL_POST_REQUEST, sagaAddWallPostWorker)
    yield takeEvery(GET_WALL_POSTS_REQUEST, sagaGetWallPostsWorker)
    yield takeEvery(SET_POST_LIKE_REQUEST, sagaSetPostLike)
}
