import { myFirebase, db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'
import { getCurrentUserInfo } from './getCurrentUserInfo'

export const USER_EDIT_REQUEST = "USER_EDIT_REQUEST";
export const USER_EDIT_FAILURE = "USER_EDIT_FAILURE";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";


export const requestEditProfile = (nickname: string, usercounter: number) => {
    return {
      type: USER_EDIT_REQUEST,
      payload: { nickname: nickname, usercounter: usercounter }
    };
  };
  
export const receiveEditProfile = (data: any, userinfo: any) => {
    return {
        type: USER_EDIT_SUCCESS,
        payload: data,
        userinfo
    };
};

export const editProfileError = (error: { code: string, message: string, a: null }) => {
    return {
        type: USER_EDIT_FAILURE,
        payload: error.code
    };
};


export function* sagaEditProfileWorker(action: {payload: {nickname: string, usercounter: number}, type: string}) {
    const { nickname, usercounter } = action.payload
    try {
      if (nickname.length < 3) {
        throw new Error(); 
      }
      const payload = yield call(() => editUserInfo(nickname, usercounter))
      const userinfo = yield call(() => getCurrentUserInfo(usercounter))
      yield put(receiveEditProfile(payload, userinfo))
    } catch (e) {
      yield put(editProfileError(e))
    }
}


async function editUserInfo(nickname: string, usercounter: number) {
    const response = await db.collection("userinfo").doc(`${usercounter}`).update({
      nickname: nickname,
    })
    return response;
  }