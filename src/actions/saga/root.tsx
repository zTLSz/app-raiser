import { takeEvery } from 'redux-saga/effects'
import { sagaRegWorker, REG_REQUEST } from '../reg'


export function* rootSaga() {
    yield takeEvery(REG_REQUEST, sagaRegWorker)
}
