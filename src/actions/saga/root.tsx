import { takeEvery } from 'redux-saga/effects'
import { sagaRegWorker, REG_REQUEST } from '../reg'
import { sagaLoginWorker, LOGIN_REQUEST, sagaVerifyWorker, VERIFY_REQUEST, sagaLogoutWorker, LOGOUT_REQUEST } from '../auth'


export function* rootSaga() {
    yield takeEvery(REG_REQUEST, sagaRegWorker)
    yield takeEvery(LOGIN_REQUEST, sagaLoginWorker)
    yield takeEvery(VERIFY_REQUEST, sagaVerifyWorker)
    yield takeEvery(LOGOUT_REQUEST, sagaLogoutWorker)
}
