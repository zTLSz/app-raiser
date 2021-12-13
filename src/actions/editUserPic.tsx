import { db } from "../firebase/firebase";
import { put, call } from "redux-saga/effects";
import { getCurrentUserInfo } from "./getCurrentUserInfo";

export const USER_PIC_EDIT_REQUEST = "USER_PIC_EDIT_REQUEST";
export const USER_PIC_EDIT_FAILURE = "USER_PIC_EDIT_FAILURE";
export const USER_PIC_EDIT_SUCCESS = "USER_PIC_EDIT_SUCCESS";

export const requestEditPicProfile = (url: string, usercounter: number) => {
  return {
    type: USER_PIC_EDIT_REQUEST,
    payload: { url: url, usercounter: usercounter },
  };
};

export const receiveEditPicProfile = (data: any, userinfo: any) => {
  return {
    type: USER_PIC_EDIT_SUCCESS,
    payload: data,
    userinfo,
  };
};

export const editProfilePicError = (error: {
  code: string;
  message: string;
  a: null;
}) => {
  return {
    type: USER_PIC_EDIT_FAILURE,
    payload: error.code,
  };
};

export function* sagaEditProfilePicWorker(action: {
  payload: { url: string; usercounter: number };
  type: string;
}) {
  const { url, usercounter } = action.payload;
  try {
    const payload = yield call(() => editUserInfo(url, usercounter));
    const userinfo = yield call(() => getCurrentUserInfo(usercounter));
    yield put(receiveEditPicProfile(payload, userinfo));
  } catch (e) {
    yield put(editProfilePicError(e));
  }
}

async function editUserInfo(url: string, usercounter: number) {
  const response = await db
    .collection("userinfo")
    .doc(`${usercounter}`)
    .update({
      avatar: url,
    });
  return response;
}
