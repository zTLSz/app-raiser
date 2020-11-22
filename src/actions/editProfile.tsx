import { myFirebase, db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'
import firebase from 'firebase'

export const USER_EDIT_REQUEST = "USER_EDIT_REQUEST";
export const USER_EDIT_FAILURE = "USER_EDIT_FAILURE";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";


export const requestEditProfile = (nickname: string, usercounter: number) => {
    return {
      type: USER_EDIT_REQUEST,
      payload: { nickname: nickname, usercounter: usercounter }
    };
  };
  
export const receiveEditProfile = (data: any) => {
    return {
        type: USER_EDIT_SUCCESS,
        payload: data
    };
};

export const editProfileError = (error: { code: string, message: string, a: null }) => {
    return {
        type: USER_EDIT_FAILURE,
        payload: error.code
    };
};


  export function* sagaEditProfileWorker(action: {payload: {nickname: string, usercounter: number}, type: string}) {
    try {
      const payload = yield call(() => editUserInfo(action.payload.nickname, action.payload.usercounter))
      yield put(receiveEditProfile(payload))
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