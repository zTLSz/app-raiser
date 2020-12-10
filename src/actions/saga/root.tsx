import { takeEvery } from 'redux-saga/effects'
import { sagaRegWorker, REG_REQUEST } from '../reg'
import { sagaLoginWorker, LOGIN_REQUEST, sagaVerifyWorker, VERIFY_REQUEST, sagaLogoutWorker, LOGOUT_REQUEST } from '../auth'
import { sagaEditProfileWorker, USER_EDIT_REQUEST } from '../editProfile'
import { sagaEditProfilePicWorker, USER_PIC_EDIT_REQUEST } from '../editUserPic'
import { sagaGetProfileWorker, GET_PROFILE_REQUEST } from '../getProfile'


export function* rootSaga() {
    yield takeEvery(REG_REQUEST, sagaRegWorker)
    yield takeEvery(LOGIN_REQUEST, sagaLoginWorker)
    yield takeEvery(VERIFY_REQUEST, sagaVerifyWorker)
    yield takeEvery(LOGOUT_REQUEST, sagaLogoutWorker)
    yield takeEvery(USER_EDIT_REQUEST, sagaEditProfileWorker)
    yield takeEvery(USER_PIC_EDIT_REQUEST, sagaEditProfilePicWorker)
    yield takeEvery(GET_PROFILE_REQUEST, sagaGetProfileWorker)
}
