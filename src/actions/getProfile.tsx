import { put, call } from 'redux-saga/effects'
import { getCurrentUserInfo } from './getCurrentUserInfo'

export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";


export const requestGetProfile = (usercounter: string|number) => {
    return {
      type: GET_PROFILE_REQUEST,
      payload: { usercounter: usercounter }
    };
  };
  
export const receiveGetProfile = (userinfo: any) => {
    return {
        type: GET_PROFILE_SUCCESS,
        userinfo
    };
};

export const getProfileError = (error: { code: string, message: string, a: null }) => {
    return {
        type: GET_PROFILE_FAILURE,
        payload: error.code
    };
};


export function* sagaGetProfileWorker(action: {payload: {usercounter: number}, type: string}) {
    const { usercounter } = action.payload
    try {
      const userinfo = yield call(() => getCurrentUserInfo(usercounter))
      yield put(receiveGetProfile(userinfo))
    } catch (e) {
      yield put(getProfileError(e))
    }
}